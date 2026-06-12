WidgetMetadata = {
  id: "jableSearchTao",
  title: "jable聚合",
  description: "jable单聚合版",
  author: "廿二日",
  site: "https://jable.tv",
  version: "1.1.4",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  modules: [
    {
      id: "loadResource",
      title: "jable聚合",
      functionName: "loadResource",
      type: "stream",
      params: [],
    },
  ]
};

const BASE_URL = "https://jable.tv";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function getHeaders(referer) {
  return {
    "User-Agent": UA,
    "Referer": referer || BASE_URL + "/",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8",
  };
}

function normalizeUrl(href) {
  if (!href) return "";
  if (href.startsWith("http")) return href;
  if (href.startsWith("/")) return BASE_URL + href;
  return BASE_URL + "/" + href;
}

function safeText(str) {
  return (str || "").replace(/\s+/g, " ").trim();
}

function parseListHtml(html) {
  if (!html || !html.trim()) return [];
  const $ = Widget.html.load(html);
  const items = [];
  const seen = new Set();

  $(".video-img-box").each((_, el) => {
    const $item = $(el);
    const $link = $item.find("div.img-box a").first();
    const href = $link.attr("href") || "";
    const link = normalizeUrl(href);

    if (!link || seen.has(link) || !link.includes("jable.tv/videos/")) return;
    seen.add(link);

    const $img = $item.find("img").first();
    const cover = $img.attr("data-src") || $img.attr("src") || "";
    const title = safeText($item.find("h6.title a, .title a").first().text()) || safeText($img.attr("alt"));
    if (!title) return;

    const durationText = safeText($item.find(".absolute-bottom-right .label").first().text()) || undefined;

    items.push({
      id: link,
      type: "url",
      title,
      backdropPath: cover || undefined,
      posterPath: cover || undefined,
      durationText,
      link,
      mediaType: "movie",
      playerType: "ijk",
    });
  });

  return items;
}

async function loadResource(params = {}) {
  try {
    let keyword = (params.title || params.seriesName || params.keyword || "").trim();
    
    const allParamsString = JSON.stringify(params);
    const codeMatch = allParamsString.match(/[a-zA-Z]{2,6}[-_]?\d{3,7}/); 
    
    if (codeMatch) {
      keyword = codeMatch[0];
    }

    if (!keyword) return [];

    const directLink = (params.link || "");
    const targetLink = directLink.includes("jable.tv/videos/")
      ? directLink
      : await (async () => {
          const q = encodeURIComponent(keyword);
          const url = `${BASE_URL}/search/${q}/?mode=async&function=get_block&block_id=list_videos_videos_list_search_result&q=${q}`;
          const { data } = await Widget.http.get(url, { headers: getHeaders() });
          const results = parseListHtml(data || "");
          return results[0]?.link || null;
        })();

    if (!targetLink) return [];

    const { data } = await Widget.http.get(targetLink, { headers: getHeaders() });
    
    let videoUrl = "";
    const hlsMatch = data.match(/var\s+hlsUrl\s*=\s*['"]([^'"]+)['"]/);
    videoUrl = hlsMatch?.[1] || "";
    
    if (!videoUrl) {
      for (const pattern of [
        /(?:videoUrl|sourceUrl|playlist)\s*[:=]\s*['"]([^'"]+)['"]/i,
        /['"]([^'"]+?\.m3u8[^'"]*)['"]/,
        /['"]([^'"]+?\.mp4[^'"]*)['"]/,
      ]) {
        const m = data.match(pattern);
        if (m && m[1]) { videoUrl = m[1]; break; }
      }
    }

    if (!videoUrl) return []; 
    if (videoUrl.startsWith("//")) videoUrl = "https:" + videoUrl;

    return [{
      name: keyword ? `${keyword}` : "jable HLS",
      description: "jable | 1080P",
      url: videoUrl,
      playerType: "ijk",  
      customHeaders: {
        "User-Agent": UA,
        "Referer": targetLink, 
        "Origin": BASE_URL,
      },
    }];
  } catch (e) {
    return [];
  }
}

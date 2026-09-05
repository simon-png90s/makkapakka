// 填入 missav 网站抓取的 cookie
const MISSAV_COOKIE = "user_uuid=059111d5-c7d1-4abf-b589-34d21eee60f4";
// 填入你部署的字幕 Workers 的 url, "https://xxxx.xxxx.workers.dev/"
const SUBTITLE_WORKER_BASE_URL = "https://misszimu.cankun90s.workers.dev/";
const MISSAV_SITE = "https://missav.ws";
const XUNLEI_SUBTITLE_API = "https://api-shoulei-ssl.xunlei.com/oracle/subtitle";
const SUBTITLECAT_SITE = "https://subtitlecat.com";
const JAV321_SITE = "https://www.jav321.com/video/";
const AVBASE_SITE = "https://www.avbase.net";
const RECOMBEE_DATABASE = "missav-default";
const RECOMBEE_TOKEN = "Ikkg568nlM51RHvldlPvc2GzZPE9R4XGzaH9Qj4zK9npbbbTly1gj9K4mgRn0QlV";
const RECOMBEE_BATCH_URL = "https://client-rapi-missav.recombee.com/missav-default/batch/";

const RECOMMENDATION_COVER_CONCURRENCY = 15;
const RECOMMENDATION_LIMIT = 10;
const BUILT_IN_CHINESE_SUBTITLE_MARKER = "builtInChineseSubtitle=1";
const MISSAV_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/604.1.14 (KHTML, like Gecko)";
const MISSAV_BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0";

var WidgetMetadata = {
  id: "missav",
  title: "MissAV",
  description: "获取 MissAV 推荐",
  version: "5.2.1",
  requiredVersion: "0.0.7",
  detailCacheDuration: 300,
  site: "https://missav.ws",
  icon: "https://missav.ws/favicon.ico",
  modules: [
    {
      title: "搜索影片",
      description: "搜索 MissAV 影片内容",
      requiresWebView: true,
      functionName: "searchVideos",
      cacheDuration: 1800,
      params: [
        {
          name: "keyword",
          title: "搜索关键词",
          type: "input",
          description: "输入搜索关键词（演员名、番号、标题等）",
          value: ""
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "今日热门",
      description: "今日热门影片",
      requiresWebView: true,
      functionName: "loadTodayHot",
      cacheDuration: 1800,
      params: [
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "本周热门",
      description: "本周热门影片",
      requiresWebView: true,
      functionName: "loadWeeklyHot",
      cacheDuration: 1800,
      params: [
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "本月热门",
      description: "本月热门影片",
      requiresWebView: true,
      functionName: "loadMonthlyHot",
      cacheDuration: 1800,
      params: [
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "新作上市",
      description: "新作上市影片",
      requiresWebView: true,
      functionName: "loadNewRelease",
      cacheDuration: 1800,
      params: [
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "中文字幕",
      description: "中文字幕影片",
      requiresWebView: true,
      functionName: "loadChineseSubtitle",
      cacheDuration: 1800,
      params: [
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "无码影片库",
      description: "无码影片各分类",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择分类",
          type: "enumeration",
          description: "选择分类",
          enumOptions: [
            { title: "无码流出", value: "https://missav.ws/dm817/cn/uncensored-leak" },
            { title: "FC2", value: "https://missav.ws/dm597/cn/fc2" },
            { title: "HEYZO", value: "https://missav.ws/dm2208642/cn/heyzo" },
            { title: "东京热", value: "https://missav.ws/dm42/cn/tokyohot" },
            { title: "Caribbeancom", value: "https://missav.ws/dm7704788/cn/caribbeancom" },
            { title: "Gachinco", value: "https://missav.ws/dm150/cn/gachinco" },
            { title: "XXX-AV", value: "https://missav.ws/dm42/cn/xxxav" },
            { title: "人妻斩", value: "https://missav.ws/dm37/cn/marriedslash" },
            { title: "顽皮 4610", value: "https://missav.ws/dm33/cn/naughty4610" },
            { title: "顽皮 0930", value: "https://missav.ws/dm37/cn/naughty0930" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "亚洲AV专区",
      description: "亚洲AV各分类",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择分类",
          type: "enumeration",
          description: "选择分类",
          enumOptions: [
            { title: "麻豆传媒", value: "https://missav.ws/dm63/cn/madou" },
            { title: "韩国直播", value: "https://missav.ws/cn/klive" },
            { title: "中国直播", value: "https://missav.ws/cn/clive" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "影片质量类",
      description: "影片质量类 - 12个类型，748,863部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "高清 (248,852部)", value: "https://missav.ws/dm96/cn/genres/%E9%AB%98%E6%B8%85" },
            { title: "独家 (220,805部)", value: "https://missav.ws/dm142/cn/genres/%E7%8B%AC%E5%AE%B6" },
            { title: "单体作品 (185,259部)", value: "https://missav.ws/dm122/cn/genres/%E5%8D%95%E4%BD%93%E4%BD%9C%E5%93%81" },
            { title: "薄格 (93,610部)", value: "https://missav.ws/dm77/cn/genres/%E8%96%84%E6%A0%BC" },
            { title: "全高清 (FHD) (11928部)", value: "https://missav.ws/cn/genres/%E5%85%A8%E9%AB%98%E6%B8%85%20(FHD)" },
            { title: "低成本影片 (70部)", value: "https://missav.ws/cn/genres/%E4%BD%8E%E6%88%90%E6%9C%AC%E5%BD%B1%E7%89%87" },
            { title: "套装商品 (44部)", value: "https://missav.ws/cn/genres/%E5%A5%97%E8%A3%85%E5%95%86%E5%93%81" },
            { title: "限时特卖 (37部)", value: "https://missav.ws/cn/genres/%E9%99%90%E6%97%B6%E7%89%B9%E5%8D%96" },
            { title: "高清 (HD) (36部)", value: "https://missav.ws/cn/genres/%E9%AB%98%E6%B8%85%20%28HD%29" },
            { title: "协力作品 (32部)", value: "https://missav.ws/cn/genres/%E5%8D%8F%E5%8A%9B%E4%BD%9C%E5%93%81" },
            { title: "单一作品 (13部)", value: "https://missav.ws/cn/genres/%E5%8D%95%E4%B8%80%E4%BD%9C%E5%93%81" },
            { title: "仅限分发 (12部)", value: "https://missav.ws/cn/genres/%E4%BB%85%E9%99%90%E5%88%86%E5%8F%91" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "角色与身份",
      description: "角色与身份 - 23个类型，609,543部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "人妻 (123,405部)", value: "https://missav.ws/dm81/cn/genres/%E4%BA%BA%E5%A6%BB" },
            { title: "熟女 (111,004部)", value: "https://missav.ws/dm124/cn/genres/%E7%86%9F%E5%A5%B3" },
            { title: "素人 (97,868部)", value: "https://missav.ws/dm151/cn/genres/%E7%B4%A0%E4%BA%BA" },
            { title: "美少女 (89,506部)", value: "https://missav.ws/dm437/cn/genres/%E7%BE%8E%E5%B0%91%E5%A5%B3" },
            { title: "痴女 (71,969部)", value: "https://missav.ws/dm334/cn/genres/%E7%97%B4%E5%A5%B3" },
            { title: "女高中生 (62,542部)", value: "https://missav.ws/dm4466/cn/genres/%E5%A5%B3%E9%AB%98%E4%B8%AD%E7%94%9F" },
            { title: "秘书 (997部)", value: "https://missav.ws/dm63/cn/genres/秘书" },
            { title: "美丽的成熟女人 (135部)", value: "https://missav.ws/cn/genres/美丽的成熟女人" },
            { title: "妈妈朋友 (98部)", value: "https://missav.ws/dm12/cn/genres/%E5%A6%88%E5%A6%88%E6%9C%8B%E5%8F%8B" },
            { title: "M女人 (77部)", value: "https://missav.ws/dm2/cn/genres/M%E5%A5%B3%E4%BA%BA" },
            { title: "成熟的女人 (32部)", value: "https://missav.ws/cn/genres/%E6%88%90%E7%86%9F%E7%9A%84%E5%A5%B3%E4%BA%BA" },
            { title: "家庭主妇 (32部)", value: "https://missav.ws/cn/genres/%E5%AE%B6%E5%BA%AD%E4%B8%BB%E5%A6%87" },
            { title: "成熟女人 / 已婚女人 (29部)", value: "https://missav.ws/dm3/cn/genres/%E6%88%90%E7%86%9F%E5%A5%B3%E4%BA%BA%20/%20%E5%B7%B2%E5%A9%9A%E5%A5%B3%E4%BA%BA" },
            { title: "其他学生 (21部)", value: "https://missav.ws/dm1/cn/genres/%E5%85%B6%E4%BB%96%E5%AD%A6%E7%94%9F" },
            { title: "大小姐 (19部)", value: "https://missav.ws/dm78/cn/genres/%E5%A4%A7%E5%B0%8F%E5%A7%90" },
            { title: "公主 (18部)", value: "https://missav.ws/cn/genres/%E5%85%AC%E4%B8%BB" },
            { title: "美丽的女孩 (12部)", value: "https://missav.ws/dm89/cn/genres/%E7%BE%8E%E4%B8%BD%E7%9A%84%E5%A5%B3%E5%AD%A9" },
            { title: "新娘 / 年轻的妻子 (10部)", value: "https://missav.ws/cn/genres/%E6%96%B0%E5%A8%98%20/%20%E5%B9%B4%E8%BD%BB%E7%9A%84%E5%A6%BB%E5%AD%90" },
            { title: "养女 (10部)", value: "https://missav.ws/dm4/cn/genres/%E5%85%BB%E5%A5%B3" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "性行为类型",
      description: "性行为类型 - 19个类型，759,620部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "中出 (198,292部)", value: "https://missav.ws/dm133/cn/genres/%E4%B8%AD%E5%87%BA" },
            { title: "口交 (95,026部)", value: "https://missav.ws/dm1303/cn/genres/%E5%8F%A3%E4%BA%A4" },
            { title: "骑乘 (86,850部)", value: "https://missav.ws/dm490/cn/genres/%E9%AA%91%E4%B9%98" },
            { title: "潮吹 (73,825部)", value: "https://missav.ws/dm166/cn/genres/%E6%BD%AE%E5%90%B9" },
            { title: "乳交 (68,569部)", value: "https://missav.ws/dm599/cn/genres/%E4%B9%B3%E4%BA%A4" },
            { title: "颜射 (63,513部)", value: "https://missav.ws/dm321/cn/genres/%E9%A2%9C%E5%B0%84" },
            { title: "自慰 (60,648部)", value: "https://missav.ws/dm8546/cn/genres/%E8%87%AA%E6%85%B0" },
            { title: "手淫 (58,635部)", value: "https://missav.ws/dm95/cn/genres/%E6%89%8B%E6%B7%AB" },
            { title: "内射精 (57部)", value: "https://missav.ws/dm77/cn/genres/%E5%86%85%E5%B0%84%E7%B2%BE" },
            { title: "极致高潮 (88部)", value: "https://missav.ws/dm26/cn/genres/%E6%9E%81%E8%87%B4%E9%AB%98%E6%BD%AE" },
            { title: "3P (26部)", value: "https://missav.ws/dm45/cn/genres/3P" },
            { title: "多人 (26部)", value: "https://missav.ws/cn/genres/%E5%A4%9A%E4%BA%BA" },
            { title: "狗狗式 (19部)", value: "https://missav.ws/cn/genres/%E7%8B%97%E7%8B%97%E5%BC%8F" },
            { title: "撒尿 (17部)", value: "https://missav.ws/cn/genres/%E6%92%92%E5%B0%BF" },
            { title: "盐吹 (16部)", value: "https://missav.ws/cn/genres/%E7%9B%90%E5%90%B9" },
            { title: "撒尿 (14部)", value: "https://missav.ws/cn/genres/%E6%92%92%E5%B0%BF" },
            { title: "3P / 4P (11部)", value: "https://missav.ws/cn/genres/3P%20/%204P" },
            { title: "洗澡 (26部)", value: "https://missav.ws/cn/genres/%E6%B4%97%E6%BE%A1" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "情节与主题",
      description: "情节与主题 - 15个类型，363,926部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "企划 (67,686部)", value: "https://missav.ws/dm349/cn/genres/%E4%BC%81%E5%88%92" },
            { title: "乱伦 (56,481部)", value: "https://missav.ws/dm58/cn/genres/%E4%B9%B1%E4%BC%A6" },
            { title: "NTR (51,273部)", value: "https://missav.ws/dm772/cn/genres/NTR" },
            { title: "搭讪 (48,965部)", value: "https://missav.ws/dm370/cn/genres/%E6%90%AD%E8%AE%AA" },
            { title: "淫乱 (47,821部)", value: "https://missav.ws/dm906/cn/genres/%E6%B7%AB%E4%B9%B1" },
            { title: "剧情 (46,573部)", value: "https://missav.ws/dm106/cn/genres/%E5%89%A7%E6%83%85" },
            { title: "羞辱 (44,892部)", value: "https://missav.ws/dm162/cn/genres/%E7%BE%9E%E8%BE%B1" },
            { title: "妻子的出轨 / NTR / 戴绿帽子 (74部)", value: "https://missav.ws/cn/genres/%E5%A6%BB%E5%AD%90%E7%9A%84%E5%87%BA%E8%BD%A8%20/%20NTR%20/%20%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "戴绿帽子 (39部)", value: "https://missav.ws/dm23/cn/genres/%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "告白体验 (30部)", value: "https://missav.ws/cn/genres/%E5%91%8A%E7%99%BD%E4%BD%93%E9%AA%8C" },
            { title: "外遇妻子 / NTR / 戴绿帽子 (17部)", value: "https://missav.ws/cn/genres/%E5%A4%96%E9%81%87%E5%A6%BB%E5%AD%90%20/%20NTR%20/%20%E6%88%B4%E7%BB%BF%E5%B8%BD%E5%AD%90" },
            { title: "交往 (13部)", value: "https://missav.ws/cn/genres/%E4%BA%A4%E5%BE%80" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "特殊玩法类",
      description: "特殊玩法 - 9个类型，85,102部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "多人运动 (53,962部)", value: "https://missav.ws/dm321/cn/genres/%E5%A4%9A%E4%BA%BA%E8%BF%90%E5%8A%A8" },
            { title: "拘束 (41,628部)", value: "https://missav.ws/dm154/cn/genres/%E6%8B%98%E6%9D%9F" },
            { title: "脏话 (63部)", value: "https://missav.ws/cn/genres/%E8%84%8F%E8%AF%9D" },
            { title: "催眠洗脑 (62部)", value: "https://missav.ws/cn/genres/%E5%82%AC%E7%9C%A0%E6%B4%97%E8%84%91" },
            { title: "口球 (51部)", value: "https://missav.ws/cn/genres/%E5%8F%A3%E7%90%83" },
            { title: "放置Play (31部)", value: "https://missav.ws/cn/genres/%E6%94%BE%E7%BD%AEPlay" },
            { title: "奴隶 (26部)", value: "https://missav.ws/dm6/cn/genres/%E5%A5%B4%E9%9A%B6" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "身材特征类",
      description: "身材特征 - 14个类型，234,821部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "巨乳 (165,810部)", value: "https://missav.ws/dm156/cn/genres/%E5%B7%A8%E4%B9%B3" },
            { title: "苗条 (34,968部)", value: "https://missav.ws/dm757/cn/genres/%E8%8B%97%E6%9D%A1" },
            { title: "美乳 (33,527部)", value: "https://missav.ws/dm218/cn/genres/%E7%BE%8E%E4%B9%B3" },
            { title: "D罩杯 (79部)", value: "https://missav.ws/cn/genres/D%E7%BD%A9%E6%9D%AF" },
            { title: "背部 (73部)", value: "https://missav.ws/dm429/cn/genres/%E8%83%8C%E9%83%A8" },
            { title: "美丽的屁股 (60部)", value: "https://missav.ws/cn/genres/%E7%BE%8E%E4%B8%BD%E7%9A%84%E5%B1%81%E8%82%A1" },
            { title: "E罩杯以上的Judai（青少年） (55部)", value: "https://missav.ws/cn/genres/E%E7%BD%A9%E6%9D%AF%E4%BB%A5%E4%B8%8A%E7%9A%84Judai%EF%BC%88%E9%9D%92%E5%B0%91%E5%B9%B4%EF%BC%89" },
            { title: "甜屁股 (54部)", value: "https://missav.ws/dm1/cn/genres/%E7%94%9C%E5%B1%81%E8%82%A1" },
            { title: "美尻 (46部)", value: "https://missav.ws/cn/genres/%E7%BE%8E%E5%B0%BB" },
            { title: "性感的腿 (42部)", value: "https://missav.ws/cn/genres/%E6%80%A7%E6%84%9F%E7%9A%84%E8%85%BF" },
            { title: "大乳房 (31部)", value: "https://missav.ws/dm2/cn/genres/%E5%A4%A7%E4%B9%B3%E6%88%BF" },
            { title: "白皙的皮肤 (16部)", value: "https://missav.ws/cn/genres/%E7%99%BD%E7%9A%99%E7%9A%84%E7%9A%AE%E8%82%A4" },
            { title: "小乳房 (16部)", value: "https://missav.ws/cn/genres/%E5%B0%8F%E4%B9%B3%E6%88%BF" },
            { title: "皮肤黑 (44部)", value: "https://missav.ws/cn/genres/%E7%9A%AE%E8%82%A4%E9%BB%91" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "职业角色类",
      description: "职业角色 - 8个类型，372部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "接待员 (97部)", value: "https://missav.ws/cn/genres/%E6%8E%A5%E5%BE%85%E5%91%98" },
            { title: "女导游 (92部)", value: "https://missav.ws/dm143/cn/genres/%E5%A5%B3%E5%AF%BC%E6%B8%B8" },
            { title: "啦啦队 (69部)", value: "https://missav.ws/cn/genres/%E5%95%A6%E5%95%A6%E9%98%9F" },
            { title: "空中小姐 CA (50部)", value: "https://missav.ws/dm3/cn/genres/%E7%A9%BA%E4%B8%AD%E5%B0%8F%E5%A7%90%20CA" },
            { title: "台湾模特儿 (20部)", value: "https://missav.ws/cn/genres/%E5%8F%B0%E6%B9%BE%E6%A8%A1%E7%89%B9%E5%84%BF" },
            { title: "迷你裙女警 (20部)", value: "https://missav.ws/dm1/cn/genres/%E8%BF%B7%E4%BD%A0%E8%A3%99%E5%A5%B3%E8%AD%A6" },
            { title: "色情明星 (14部)", value: "https://missav.ws/cn/genres/%E8%89%B2%E6%83%85%E6%98%8E%E6%98%9F" },
            { title: "演员 (10部)", value: "https://missav.ws/cn/genres/%E6%BC%94%E5%91%98" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "拍摄方式类",
      description: "拍摄方式 - 6个类型，78,894部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "自拍 (39,847部)", value: "https://missav.ws/dm978/cn/genres/%E8%87%AA%E6%8B%8D" },
            { title: "偷拍 (38,924部)", value: "https://missav.ws/dm532/cn/genres/%E5%81%B7%E6%8B%8D" },
            { title: "第一次拍摄 (48部)", value: "https://missav.ws/dm2/cn/genres/%E7%AC%AC%E4%B8%80%E6%AC%A1%E6%8B%8D%E6%91%84" },
            { title: "主观性 (16部)", value: "https://missav.ws/cn/genres/%E4%B8%BB%E8%A7%82%E6%80%A7" },
            { title: "记录 (15部)", value: "https://missav.ws/cn/genres/%E8%AE%B0%E5%BD%95" },
            { title: "按摩 (15部)", value: "https://missav.ws/dm163/cn/genres/%E6%8C%89%E6%91%A9" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "时长合集类",
      description: "时长与合集 - 3个类型，73,839部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "4小时以上 (37,685部)", value: "https://missav.ws/dm755/cn/genres/4%E5%B0%8F%E6%97%B6%E4%BB%A5%E4%B8%8A" },
            { title: "合集 (36,142部)", value: "https://missav.ws/dm796/cn/genres/%E5%90%88%E9%9B%86" },
            { title: "超过工作时间 4 小时 (12部)", value: "https://missav.ws/cn/genres/%E8%B6%85%E8%BF%87%E5%B7%A5%E4%BD%9C%E6%97%B6%E9%97%B4%204%20%E5%B0%8F%E6%97%B6" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "服装造型类",
      description: "服装与造型 - 13个类型，657部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "裙子单声道 (75部)", value: "https://missav.ws/cn/genres/%E8%A3%99%E5%AD%90%E5%8D%95%E5%A3%B0%E9%81%93" },
            { title: "浴衣 (72部)", value: "https://missav.ws/dm1/cn/genres/%E6%B5%B4%E8%A1%A3" },
            { title: "中长发 (69部)", value: "https://missav.ws/dm1/cn/genres/%E4%B8%AD%E9%95%BF%E5%8F%91" },
            { title: "连裤袜的事 (67部)", value: "https://missav.ws/cn/genres/%E8%BF%9E%E8%A3%A4%E8%A2%9C%E7%9A%84%E4%BA%8B" },
            { title: "面具 (85部)", value: "https://missav.ws/dm2/cn/genres/%E9%9D%A2%E5%85%B7" },
            { title: "靴子 (44部)", value: "https://missav.ws/cn/genres/%E9%9D%B4%E5%AD%90" },
            { title: "卷发 (37部)", value: "https://missav.ws/cn/genres/%E5%8D%B7%E5%8F%91" },
            { title: "高跟鞋 (36部)", value: "https://missav.ws/cn/genres/%E9%AB%98%E8%B7%9F%E9%9E%8B" },
            { title: "围裙 (31部)", value: "https://missav.ws/dm25/cn/genres/%E5%9B%B4%E8%A3%99" },
            { title: "金发 (51部)", value: "https://missav.ws/cn/genres/%E9%87%91%E5%8F%91" },
            { title: "啡发 (76部)", value: "https://missav.ws/cn/genres/%E5%95%A1%E5%8F%91" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    },
    {
      title: "特殊题材类",
      description: "特殊题材 - 25个类型，901部影片",
      requiresWebView: true,
      functionName: "loadPage",
      cacheDuration: 1800,
      params: [
        {
          name: "url",
          title: "选择类型",
          type: "enumeration",
          description: "选择具体类型",
          enumOptions: [
            { title: "SF (95部)", value: "https://missav.ws/dm1/cn/genres/SF" },
            { title: "洛丽塔 (83部)", value: "https://missav.ws/cn/genres/%E6%B4%9B%E4%B8%BD%E5%A1%94" },
            { title: "御宅 (82部)", value: "https://missav.ws/dm1/cn/genres/%E5%BE%A1%E5%AE%85" },
            { title: "魔法少女 (75部)", value: "https://missav.ws/cn/genres/%E9%AD%94%E6%B3%95%E5%B0%91%E5%A5%B3" },
            { title: "游戏现实版 (39部)", value: "https://missav.ws/cn/genres/%E6%B8%B8%E6%88%8F%E7%8E%B0%E5%AE%9E%E7%89%88" },
            { title: "3D (38部)", value: "https://missav.ws/dm24/cn/genres/3D" },
            { title: "AI生成的作品 (37部)", value: "https://missav.ws/cn/genres/AI%E7%94%9F%E6%88%90%E7%9A%84%E4%BD%9C%E5%93%81" },
            { title: "动漫人物 (35部)", value: "https://missav.ws/cn/genres/%E5%8A%A8%E6%BC%AB%E4%BA%BA%E7%89%A9" },
            { title: "虚拟现实 (35部)", value: "https://missav.ws/cn/genres/%E8%99%9A%E6%8B%9F%E7%8E%B0%E5%AE%9E" },
            { title: "动画 (14部)", value: "https://missav.ws/cn/genres/%E5%8A%A8%E7%94%BB" },
            { title: "偶像 (13部)", value: "https://missav.ws/dm1/cn/genres/%E5%81%B6%E5%83%8F" },
            { title: "透过偶像 (32部)", value: "https://missav.ws/cn/genres/%E9%80%8F%E8%BF%87%E5%81%B6%E5%83%8F" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序方式",
          value: "released_at",
          enumOptions: [
            { title: "发行日期", value: "released_at" },
            { title: "最近更新", value: "published_at" },
            { title: "收藏数", value: "saved" },
            { title: "今日浏览数", value: "today_views" },
            { title: "本周浏览数", value: "weekly_views" },
            { title: "本月浏览数", value: "monthly_views" },
            { title: "总浏览数", value: "views" }
          ]
        },
        { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
      ]
    }
  ],
  search: {
    title: "搜索",
    functionName: "searchVideos",
    params: [
      {
        name: "keyword",
        title: "搜索关键词",
        type: "input",
        description: "输入搜索关键词（演员名、番号、标题等）",
        value: ""
      },
      {
        name: "sort_by",
        title: "排序",
        type: "enumeration",
        description: "排序方式",
        value: "released_at",
        enumOptions: [
          { title: "发行日期", value: "released_at" },
          { title: "最近更新", value: "published_at" },
          { title: "收藏数", value: "saved" },
          { title: "今日浏览数", value: "today_views" },
          { title: "本周浏览数", value: "weekly_views" },
          { title: "本月浏览数", value: "monthly_views" },
          { title: "总浏览数", value: "views" }
        ]
      },
      { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
    ]
  }
};

async function searchVideos(params = {}) {
  const keyword = params.keyword ? params.keyword.trim() : '';
  const page = parseInt(params.page) || 1;
  const sortBy = params.sort_by;

  if (!keyword) {
    return [];
  }

  const encodedKeyword = encodeURIComponent(keyword);
  let url = `${MISSAV_SITE}/cn/search/${encodedKeyword}`;
  let hasParams = false;

  if (sortBy) {
    url += `?sort=${sortBy}`;
    hasParams = true;
  }

  if (page > 1) {
    url += hasParams ? `&page=${page}` : `?page=${page}`;
  }

  const searchResults = await fetchVideoList(url, params);

  return searchResults;
}

async function loadTodayHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = `${MISSAV_SITE}/dm301/cn/today-hot?sort=today_views`;

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadWeeklyHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = `${MISSAV_SITE}/dm170/cn/weekly-hot?sort=weekly_views`;

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadMonthlyHot(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = `${MISSAV_SITE}/dm273/cn/monthly-hot?sort=monthly_views`;

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadNewRelease(params = {}) {
  const page = parseInt(params.page) || 1;

  let url = `${MISSAV_SITE}/dm635/cn/release?sort=released_at`;

  if (page > 1) {
    url += `&page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadChineseSubtitle(params = {}) {
  const page = parseInt(params.page) || 1;
  const sortBy = params.sort_by || "released_at";

  let url = `${MISSAV_SITE}/dm278/cn/chinese-subtitle`;
  let hasParams = false;

  if (sortBy) {
    url += `?sort=${sortBy}`;
    hasParams = true;
  }

  if (page > 1) {
    url += hasParams ? `&page=${page}` : `?page=${page}`;
  }

  return await fetchVideoList(url, params);
}

async function loadPage(params = {}) {
  const baseUrl = params.url;
  const page = parseInt(params.page) || 1;
  const sortBy = params.sort_by;

  let url = baseUrl;
  let hasParams = false;

  if (sortBy) {
    url += `?sort=${sortBy}`;
    hasParams = true;
  }

  if (page > 1) {
    url += hasParams ? `&page=${page}` : `?page=${page}`;
  }

  return await fetchVideoList(url, params);
}

function withCookie(headers, params) {
  headers = Object.assign({}, headers || {});
  const cookie = String((params && params.cookie) || MISSAV_COOKIE || "").trim();
  if (cookie) headers["Cookie"] = cookie;
  return headers;
}

function getCookie(params) {
  return String((params && params.cookie) || MISSAV_COOKIE || "").trim();
}

function hasCookieName(cookie, name) {
  return new RegExp("(?:^|;\\s*)" + name + "=").test(cookie);
}

function hasClearanceCookie(params) {
  return hasCookieName(getCookie(params), "cf_clearance");
}

function looksLikePartialCloudflareCookie(params) {
  const cookie = getCookie(params);
  return !!cookie && hasCookieName(cookie, "_cfuvid") && !hasClearanceCookie(params);
}

function sleep(ms) {
  if (typeof setTimeout !== "function") return Promise.resolve();
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isBlockedHtml(data) {
  const text = String(data || "");
  return !text ||
    text.includes("Just a moment") ||
    text.includes("cf-browser-verification") ||
    text.includes("Attention Required") ||
    text.includes("Cloudflare");
}

function getHttpStatus(error) {
  if (!error) return 0;
  const response = error.response || error.Response || {};
  return error.status || error.statusCode || response.status || response.statusCode || 0;
}

function isRetryableMissavError(error) {
  const status = getHttpStatus(error);
  const text = String((error && (error.message || (error.toString && error.toString()))) || "");
  return status === 403 ||
    status === 429 ||
    text.includes("status code of 403") ||
    text.includes("status code of 429");
}

function blockedMessage(error, params) {
  const status = getHttpStatus(error);
  if ((status === 403 || String(error || "").includes("403")) && looksLikePartialCloudflareCookie(params)) {
    return "访问失败：CK 可能不完整，建议提取包含 cf_clearance 的整段 Cookie";
  }
  if (status === 429) {
    return "访问过于频繁，请稍后再试";
  }
  return "访问失败，可能已被风控";
}

async function requestMissavPage(url, params, referer) {
  const delays = [0, 700];
  let lastError = null;

  for (let i = 0; i < delays.length; i++) {
    if (delays[i] > 0) await sleep(delays[i]);

    try {
      const response = await Widget.http.get(url, {
        headers: withCookie(getPageHeaders(referer), params),
        allow_redirects: true
      });

      if (response && response.data && !isBlockedHtml(response.data)) {
        return response;
      }

      lastError = new Error("blocked or empty response");
    } catch (error) {
      lastError = error;
      if (!isRetryableMissavError(error)) throw error;
    }
  }

  throw lastError || new Error("request failed");
}

async function requestMissavListPage(url, params, referer) {
  const delays = [0, 700];
  const uaList = getCookie(params) ? [MISSAV_BROWSER_UA, MISSAV_UA] : [MISSAV_UA, MISSAV_BROWSER_UA];
  let lastError = null;

  for (let i = 0; i < delays.length; i++) {
    if (delays[i] > 0) await sleep(delays[i]);

    for (const ua of uaList) {
      try {
        const response = await Widget.http.get(url, {
          headers: withCookie(getPageHeaders(referer, ua), params),
          allow_redirects: true
        });

        if (response && response.data && !isBlockedHtml(response.data)) {
          return response;
        }

        lastError = new Error("blocked or empty response");
      } catch (error) {
        lastError = error;
        if (!isRetryableMissavError(error)) throw error;
      }
    }
  }

  throw lastError || new Error("request failed");
}

function stripMissavDmPrefix(url) {
  return String(url || "").replace(/https:\/\/missav\.ai\/dm\d+\//i, MISSAV_SITE + "/");
}

function decodeUrlOnce(url) {
  try {
    return decodeURI(url);
  } catch (e) {
    return url;
  }
}

function uniqueUrls(urls) {
  const seen = {};
  return urls.filter(url => {
    if (!url || seen[url]) return false;
    seen[url] = true;
    return true;
  });
}

function getListRequestUrls(url) {
  const canonical = stripMissavDmPrefix(url);
  return uniqueUrls([
    url,
    decodeUrlOnce(url),
    canonical,
    decodeUrlOnce(canonical)
  ]);
}

async function fetchVideoList(url, params) {
  let lastError = null;
  const urls = getListRequestUrls(url);

  for (const requestUrl of urls) {
    try {
      const response = await requestMissavListPage(requestUrl, params, MISSAV_SITE + "/");

      return await parseVideoList(response.data, params);
    } catch (error) {
      lastError = error;
      if (!isRetryableMissavError(error)) throw error;
    }
  }

  try {
    if (lastError) throw lastError;
    const response = await requestMissavListPage(url, params, MISSAV_SITE + "/");

    return await parseVideoList(response.data, params);

  } catch (error) {
    return [createPlaceholderItem(blockedMessage(error, params))];
  }
}

function createPlaceholderItem(message = "已被风控，请稍后重试") {
  return {
    id: "content-placeholder",
    type: "placeholder",
    title: "🚫 " + message,
    backdropPath: "https://via.placeholder.com/400x225/FF6B6B/FFFFFF?text=%E5%B7%B2%E8%A2%AB%E9%A3%8E%E6%8E%A7",
    mediaType: "placeholder",
    duration: 0,
    durationText: "⚠️ 访问受限",
    previewUrl: "",
    videoUrl: "",
    link: "",
    description: "🔒 " + message + "\n\n💡 可能的解决方案：\n• 等待一段时间后重新尝试\n• 检查网络连接\n• 更换网络环境\n• 稍后再试",
    playerType: "none"
  };
}

function extractListMetadataFromParsedDocument($) {
  const metadataByVideoId = {};

  $('.thumbnail').each((index, element) => {
    const $card = $(element);
    const href = $card.find('a[href]').first().attr('href') || $card.attr('href') || '';
    if (!href) return;

    const durationMatch = String($card.find('span.absolute.bottom-1.right-1').first().text() || '')
      .match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);
    let hasBuiltInChineseSubtitle = false;
    $card.find('span').each((spanIndex, spanElement) => {
      const $span = $(spanElement);
      const className = String($span.attr('class') || '');
      const text = String($span.text() || '').trim();
      if (/\bbottom-1\b/i.test(className) &&
        /\bleft-1\b/i.test(className) &&
        /中文字幕/i.test(text)) {
        hasBuiltInChineseSubtitle = true;
        return false;
      }
    });

    const videoId = extractVideoId(href).toLowerCase();
    metadataByVideoId[videoId] = {
      durationText: durationMatch ? durationMatch[0] : '',
      hasBuiltInChineseSubtitle: hasBuiltInChineseSubtitle
    };
  });

  return metadataByVideoId;
}

async function parseVideoList(html, params) {
  const $ = Widget.html.load(html);
  const metadataByVideoId = extractListMetadataFromParsedDocument($);
  const videoTasks = [];
  const cookie = String((params && params.cookie) || MISSAV_COOKIE || "").trim();

  $('a[href]').each((index, element) => {
    const $link = $(element);
    const href = $link.attr('href') || '';
    const $img = $link.find('img').first();

    if ($img.length && href.match(/\/(?:cn|dm\d+)\/[a-zA-Z0-9\-]+(-uncensored-leak)?$/)) {
      const imgSrc = $img.attr('data-src') || $img.attr('src');

      if (imgSrc) {
        let title = $link.attr('title') || $img.attr('alt') || '';

        if (!title) {
          const $parent = $link.closest('div');
          title = $parent.find('h1, h2, h3, .title, [class*="title"]').first().text().trim();
        }

        if (!title) {
          title = $link.text().trim();
        }

        const videoId = extractVideoId(href);
        if (shouldHideVideo(videoId)) return;

        const fullVideoUrl = href.startsWith('http') ? href : `${MISSAV_SITE}${href}`;
        const fallbackCover = normalizeImageUrl(imgSrc) || getFourhoiCoverUrl(videoId);
        let videoCode = getBaseVideoId(videoId).toUpperCase();

        if (title && !title.match(/[A-Z]+-\d+/)) {
          title = `${videoCode} ${title}`;
        } else if (!title) {
          title = videoCode;
        }

        const metadataKey = videoId.toLowerCase();
        const listMetadata = metadataByVideoId[metadataKey] || {};
        const durationText = listMetadata.durationText;
        const hasBuiltInChineseSubtitle = listMetadata.hasBuiltInChineseSubtitle === true;
        const detailUrl = addBuiltInChineseSubtitleMarker(fullVideoUrl, hasBuiltInChineseSubtitle);
        var descParts = [];
        descParts.push(`番号: ${videoCode}`);
        if (durationText) descParts.push(`时长: ${durationText}`);

        videoTasks.push((async () => {
          const coverPaths = await resolveCoverPaths(videoId, fallbackCover);

          return {
            id: videoId.toUpperCase(),
            type: "link",
            title: title || `${videoCode}`,
            backdropPath: coverPaths.backdropPath,
            posterPath: coverPaths.posterPath,
            fallbackCoverPath: fallbackCover,
            mediaType: "movie",
            duration: 0,
            durationText: "",
            previewUrl: "",
            videoUrl: "",
            url: "",
            playUrl: "",
            link: detailUrl,
            detailUrl: detailUrl,
            cookie: cookie,
            hasBuiltInChineseSubtitle: hasBuiltInChineseSubtitle,
            // description: descParts.join("\n"),
            playerType: "none"
          };
        })());
      }
    }
  });

  return await Promise.all(videoTasks);
}

function extractVideoId(url) {
  const matches = url.match(/\/cn\/([a-zA-Z0-9\-]+)(-uncensored-leak)?$/);
  return matches ? matches[1] : url.split('/').pop();
}

function addBuiltInChineseSubtitleMarker(url, hasBuiltInChineseSubtitle) {
  if (!hasBuiltInChineseSubtitle) return url;
  return url + (url.includes("?") ? "&" : "?") + BUILT_IN_CHINESE_SUBTITLE_MARKER;
}

function readAndRemoveBuiltInChineseSubtitleMarker(url) {
  const text = String(url || "");
  const hasMarker = /(?:\?|&)builtInChineseSubtitle=1(?:&|$)/.test(text);
  const cleanUrl = text
    .replace(/([?&])builtInChineseSubtitle=1(?=&|$)/g, function (_, separator) {
      return separator === "?" ? "?" : "";
    })
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");

  return {
    url: cleanUrl,
    hasBuiltInChineseSubtitle: hasMarker
  };
}

function normalizeImageUrl(url) {
  url = String(url || "").trim();
  if (!url) return "";
  if (url.startsWith("//")) return preferHighQualityCoverUrl("https:" + url);
  if (/^https?:\/\//i.test(url)) return preferHighQualityCoverUrl(url);
  if (url.startsWith("/")) return preferHighQualityCoverUrl(MISSAV_SITE + url);
  return preferHighQualityCoverUrl(url);
}

function preferHighQualityCoverUrl(url) {
  return String(url || "").replace(/\/cover-t\.jpg(?=([?#]|$))/i, "/cover-n.jpg");
}

function getFourhoiCoverUrl(videoId) {
  return `https://fourhoi.com/${videoId}/cover-n.jpg`;
}

function getBaseVideoId(videoId) {
  return String(videoId || "")
    .trim()
    .replace(/-chinese-subtitle$/i, "")
    .replace(/-uncensored-leak$/i, "")
    .replace(/^([a-z]+-\d+)-2$/i, "$1");
}

function isFc2VideoId(videoId) {
  return /^fc2(?:[-_ ]?ppv)?[-_ ]?\d+$/i.test(getBaseVideoId(videoId));
}

const BLOCKED_VIDEO_PREFIXES = [
  //
  "FEM",
  "PETS",
  "ROE",
  "TPNS",
  // 18
  "JKWS",
  // h_086
  "HONE",
  "JRZE",
  "JURA",
  "NUKA",
  "XMOM",
  "YOCH",
  // h_458
  "HSM",
  // h_1133
  "TOTK"
];

function shouldHideVideo(videoId) {
  const baseVideoId = getBaseVideoId(videoId).toUpperCase();
  const prefixMatch = baseVideoId.match(/^([A-Z]+)/);
  const videoPrefix = prefixMatch ? prefixMatch[1] : "";

  return BLOCKED_VIDEO_PREFIXES.includes(videoPrefix);
}

const MGS_COVER_RULES = {
  ABF: { folder: "prestige", series: "abf", minDigits: 3 },
  ABP: { folder: "prestige", series: "abp", minDigits: 3 },
  ABS: { folder: "prestige", series: "abs", minDigits: 3 },
  ABW: { folder: "prestige", series: "abw", minDigits: 3 },
  PASN: { folder: "prestige", series: "pasn", minDigits: 3 },
  DDH: { folder: "doc", series: "ddh", minDigits: 3 },
  HMRK: { folder: "doc", series: "hmrk", minDigits: 3 },
  IMJO: { folder: "doc", series: "imjo", minDigits: 3 },
  MFCS: { folder: "doc", series: "mfcs", minDigits: 3 },
  MAAN: { folder: "doc", series: "maan", minDigits: 4 },
  SIMW: { folder: "doc", series: "simw", minDigits: 3 },
  SIRO: { folder: "shirouto", series: "siro", minDigits: 4 },
  GANA: { folder: "nanpatv", series: "200gana", minDigits: 4 },
  LUXU: { folder: "luxutv", series: "259luxu", minDigits: 4 },
  ARA: { folder: "ara", series: "261ara", minDigits: 3 },
  MIUM: { folder: "prestigepremium", series: "300mium", minDigits: 4 },
  JNT: { folder: "jackson", series: "390jnt", minDigits: 3 },
  LAS: { folder: "shiroutoaka", series: "415las", minDigits: 3 },
  MFC: { folder: "doc", series: "435mfc", minDigits: 3 },
  MFCW: { folder: "doc", series: "435mfcw", minDigits: 3 },
  RABI: { folder: "loverabbits", series: "770rabi", minDigits: 3 }
};

function getMgsCoverUrls(videoId) {
  const baseVideoId = getBaseVideoId(videoId).toLowerCase();
  const match = baseVideoId.match(/^([a-z]+)-?0*(\d+)$/i);
  if (!match) return null;

  const videoPrefix = match[1].toUpperCase();
  const rule = MGS_COVER_RULES[videoPrefix];
  if (!rule) return null;

  const number = String(match[2]).padStart(rule.minDigits, "0");
  const baseUrl = `https://image.mgstage.com/images/${rule.folder}/${rule.series}/${number}`;
  const fileCode = `${rule.series}-${number}`;

  return {
    posterPath: `${baseUrl}/pf_e_${fileCode}.jpg`,
    backdropPath: `${baseUrl}/pb_e_${fileCode}.jpg`
  };
}

function getDmmImageCode(videoId) {
  const baseVideoId = getBaseVideoId(videoId).toLowerCase();
  if (!baseVideoId || isFc2VideoId(baseVideoId)) return "";

  const match = baseVideoId.match(/^([a-z]+)-?0*(\d+)$/i);
  if (!match) return "";

  return match[1].toLowerCase() + String(match[2]).padStart(5, "0");
}

const FANZA_CID_PREFIX_MAP = {
  // AKDL: "1",
  // DLDSS: "1",
  // FNS: "1",
  // HBAD: "1",
  // JIMMY: "1",
  // MGOLD: "1",
  // NHDTC: "1",
  DFDM: "2",
  DFE: "2",
  ECB: "2",
  SMRA: "2",
  WSA: "2",
  ISRD: "24",
  NLD: "24",
  VDD: "24",
  GANA: "33",
  DOKS: "36",
  DSJH: "36",
  VREDS: "42",
  NITR: "49",
  FAYS: "55",
  HUSR: "57",
  MCSR: "57",
  SGSR: "57",
  HEZ: "59",
  MRMM: "60", // ai复刻
  PXV: "60",
  SRXV: "60", // ai复刻
  RMD: "61", // ai复刻
  JAC: "118",
  UMD: "125",
  REAL: "172",
  MBDD: "301",
  MARAA: "406",
  MBRAA: "406",
  ZSD: "483",
  MARR: "5050",
  PRIAN: "5389",
  HODV: "5642",
  ACZD: "h_019",
  PTS: "h_021",
  WA: "h_047",
  MXBD: "h_068",
  MXGS: "h_068",
  MXNB: "h_068",
  MXNBS: "h_068",
  CHERD: "h_086",
  EUUD: "h_086",
  FERA: "h_086",
  KAAD: "h_086",
  KAADX: "h_086",
  KEED: "h_086",
  KEEDX: "h_086",
  MESU: "h_086",
  HZ: "h_113",
  PS: "h_113",
  SPE: "h_113",
  SY: "h_113",
  MSZ: "h_173",
  JMSZ: "h_173",
  SPSC: "h_173",
  THZ: "h_173",
  JUKF: "h_227",
  AMBI: "h_237",
  CLOT: "h_237",
  MARA: "h_237",
  NACT: "h_237",
  PYM: "h_283",
  AOZ: "h_308",
  GSHRB: "h_346",
  REBD: "h_346",
  REBDB: "h_346",
  ALOG: "h_491",
  CHUC: "h_491",
  FSBK: "h_491",
  KDNM: "h_491",
  KNMB: "h_491",
  LOCK: "h_491",
  NMCH: "h_491",
  TANL: "h_491",
  TENN: "h_491",
  ONGP: "h_565",
  MABP: "h_687",
  SAN: "h_796",
  JKW: "h_848",
  HONB: "h_1133",
  OTIN: "h_1133",
  PAKO: "h_1133",
  RMSQ: "h_1133",
  SXMA: "h_1133",
  TNIK: "h_1133",
  UBUG: "h_1133",
  YAKO: "h_1133",
  MILK: "h_1240",
  ZRK: "h_1293",
  SKMJ: "h_1324",
  EINAV: "h_1350",
  CNSTV: "h_1472",
  EROFV: "h_1472",
  HMDNV: "h_1472",
  INSTV: "h_1472",
  BANK: "h_1495",
  SDGN: "h_1540",
  SHIND: "h_1560",
  STSK: "h_1605",
  BEAF: "h_1615",
  EMBM: "h_1650",
  HNHU: "h_1658",
  DOKI: "h_1664",
  HNBR: "h_1664",
  JCKL: "h_1664",
  KIR: "h_1664",
  NXGS: "h_1664",
  PES: "h_1664",
  JFM: "h_1672",
  JNS: "h_1672",
  XC: "h_1704", // ai复刻
  DAL: "h_1711",
  EBON: "h_1711",
  SUKE: "h_1711",
  HRSM: "h_1745",
  OLM: "h_1757",
  JJGG: "h_1758",
  NMSL: "h_1814",
  AWAW: "h_1819",
  ERKR: "h_1838"
};

function getDmmImageCodes(videoId) {
  const imageCode = getDmmImageCode(videoId);
  if (!imageCode) return [];

  const codeMatch = imageCode.match(/^([a-z]+)/i);
  const videoPrefix = codeMatch ? codeMatch[1].toUpperCase() : "";
  const fanzaPrefix = FANZA_CID_PREFIX_MAP[videoPrefix] || "";

  if (fanzaPrefix) {
    return [imageCode + "ai", fanzaPrefix + imageCode + "ai", fanzaPrefix + imageCode];
  }

  return [imageCode + "ai", imageCode, "1" + imageCode];
}

function buildDmmCoverUrls(imageCode) {
  const baseUrl = `https://awsimgsrc.dmm.co.jp/pics_dig/digital/video/${imageCode}/${imageCode}`;
  return {
    posterPath: `${baseUrl}ps.jpg`,
    backdropPath: `${baseUrl}pl.jpg`
  };
}

function getDmmCoverUrlCandidates(videoId) {
  return getDmmImageCodes(videoId).map(buildDmmCoverUrls);
}

function getJav321VideoCodes(videoId) {
  const baseVideoId = getBaseVideoId(videoId).toLowerCase();
  const mgsCovers = getMgsCoverUrls(baseVideoId);
  if (mgsCovers) return [baseVideoId];

  const imageCode = getDmmImageCode(baseVideoId);
  if (!imageCode) return [baseVideoId];

  const videoPrefix = (imageCode.match(/^([a-z]+)/i) || ["", ""])[1].toUpperCase();
  const fanzaPrefix = FANZA_CID_PREFIX_MAP[videoPrefix] || "";
  if (fanzaPrefix) return [fanzaPrefix.toLowerCase() + imageCode];

  return [imageCode, "1" + imageCode];
}

function parseJav321Rating(html) {
  const match = String(html || "").match(
    /<b[^>]*>\s*平均評価\s*<\/b>\s*:\s*(\d+(?:\.\d+)?)/i
  );
  return match ? Number(match[1]) : undefined;
}

function parseMissavPeople(html) {
  const text = String(html || '');
  const parseField = (label) => {
    const fieldMatch = text.match(new RegExp(
      '<span>\\s*' + label + ':\\s*<\\/span>([\\s\\S]*?)<\\/div>', 'i'
    ));
    if (!fieldMatch) return [];

    const entries = [];
    const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkPattern.exec(fieldMatch[1]))) {
      const name = match[2].replace(/<[^>]*>/g, '').trim();
      if (name) entries.push({ id: match[1], name: name });
    }
    return entries;
  };

  return {
    actresses: parseField('女优'),
    directors: parseField('导演')
  };
}

function parseJav321Actresses(html) {
  const actresses = [];
  const pattern = /<a\b[^>]*href=["']\/star\/(\d+)[^"']*["'][^>]*>[\s\S]*?<img\b[^>]*src=["']([^"']+)["'][^>]*>[\s\S]*?([^<]+)<\/a>/gi;
  let match;
  while ((match = pattern.exec(String(html || '')))) {
    const name = match[3].trim();
    if (!name) continue;
    actresses.push({
      id: match[1],
      name: name,
      profileUrl: match[2].replace(/^http:/i, 'https:')
    });
  }
  return actresses;
}

async function fetchAvBaseHtml(url) {
  try {
    if (typeof fetch !== "function") return "";
    const browserResponse = await fetch(url, {
      method: "GET",
      credentials: "include",
      cache: "no-store"
    });
    if (!browserResponse || !browserResponse.ok) return "";
    return await browserResponse.text();
  } catch (error) {
    return "";
  }
}

async function fetchAvBaseActresses(videoId) {
  const code = getBaseVideoId(videoId).toLowerCase();
  const url = AVBASE_SITE + "/works?q=" + encodeURIComponent(code);
  const html = await fetchAvBaseHtml(url);
  if (!html) return [];

  const actresses = [];
  const imagePattern = /(?:https?:)?\/\/pics\.dmm\.co\.jp\/mono\/actjpgs\/[^"'<>\\\s]+/gi;
  const imageUrls = [];
  let match;
  while ((match = imagePattern.exec(html))) {
    const imageUrl = match[0]
      .replace(/^\/\//, "https://")
      .replace(/^http:/i, "https:");
    if (imageUrls.indexOf(imageUrl) < 0) imageUrls.push(imageUrl);
  }
  for (const imageUrl of imageUrls) {
    actresses.push({
      id: "",
      name: "",
      profileUrl: imageUrl,
      source: "avbase"
    });
  }
  return actresses;
}

async function fetchMissavActressProfileUrl(actressUrl, cookie) {
  const url = String(actressUrl || '').trim();
  if (!url) return '';

  const actressPageUrl = url.startsWith('http') ? url : MISSAV_SITE + url;
  try {
    const response = await requestMissavPage(actressPageUrl, { cookie: cookie || MISSAV_COOKIE }, MISSAV_SITE + '/');
    const match = String(response && response.data || '').match(
      /https?:\/\/fourhoi\.com\/actress\/[^"'\\\s<>]*?-t\.(?:jpg|jpeg|png)/i
    );
    return match ? match[0].replace(/-t(?=\.(?:jpg|jpeg|png)$)/i, '') : '';
  } catch (error) {
    return '';
  }
}

async function buildActorsInfo(missavActresses, jav321Actresses, cookie) {
  const actors = [];
  for (let index = 0; index < missavActresses.length; index++) {
    const actress = missavActresses[index];
    const sourceActress = jav321Actresses[index];
    const profileUrl = sourceActress && sourceActress.profileUrl
      ? sourceActress.profileUrl
      : await fetchMissavActressProfileUrl(actress.id, cookie);

    actors.push({
      id: sourceActress && sourceActress.id ? sourceActress.id : actress.id,
      name: actress.name,
      profileUrl: profileUrl || undefined,
      source: sourceActress && sourceActress.profileUrl
        ? sourceActress.source || 'jav321'
        : (profileUrl ? 'missav' : undefined)
    });
  }
  return actors;
}

function buildDirectorsInfo(missavDirectors) {
  return missavDirectors.map((director) => ({
    id: director.id,
    name: director.name + " (导演)"
  }));
}

function parseMissavGenres(html) {
  const typeMatch = String(html || '').match(
    /<span>\s*类型:\s*<\/span>([\s\S]*?)<\/div>/i
  );
  if (!typeMatch) return [];

  const genres = [];
  const linkPattern = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkPattern.exec(typeMatch[1]))) {
    const genre = match[1].replace(/<[^>]*>/g, '').trim();
    if (genre) genres.push(genre);
  }
  return genres;
}

function utf8Bytes(text) {
  const bytes = [];
  const value = String(text || "");
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code < 128) bytes.push(code);
    else if (code < 2048) bytes.push(192 | (code >> 6), 128 | (code & 63));
    else bytes.push(224 | (code >> 12), 128 | ((code >> 6) & 63), 128 | (code & 63));
  }
  return bytes;
}

function sha1Bytes(input) {
  const bytes = input.slice();
  const bitLength = bytes.length * 8;
  bytes.push(128);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  for (let i = 7; i >= 0; i--) bytes.push(Math.floor(bitLength / Math.pow(2, i * 8)) & 255);

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;
  const rotate = (value, bits) => (value << bits) | (value >>> (32 - bits));

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = [];
    for (let i = 0; i < 16; i++) {
      const p = offset + i * 4;
      words[i] = ((bytes[p] << 24) | (bytes[p + 1] << 16) | (bytes[p + 2] << 8) | bytes[p + 3]) >>> 0;
    }
    for (let i = 16; i < 80; i++) words[i] = rotate(words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16], 1) >>> 0;

    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let i = 0; i < 80; i++) {
      let f, k;
      if (i < 20) { f = (b & c) | ((~b) & d); k = 0x5a827999; }
      else if (i < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (i < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc; }
      else { f = b ^ c ^ d; k = 0xca62c1d6; }
      const next = (rotate(a, 5) + f + e + k + words[i]) >>> 0;
      e = d; d = c; c = rotate(b, 30) >>> 0; b = a; a = next;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
  }

  const result = [];
  for (const value of [h0, h1, h2, h3, h4]) {
    result.push((value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255);
  }
  return result;
}

function hmacSha1Hex(key, message) {
  const block = 64;
  let keyBytes = utf8Bytes(key);
  if (keyBytes.length > block) keyBytes = sha1Bytes(keyBytes);
  while (keyBytes.length < block) keyBytes.push(0);
  const ipad = [], opad = [];
  for (let i = 0; i < block; i++) {
    ipad.push(keyBytes[i] ^ 0x36);
    opad.push(keyBytes[i] ^ 0x5c);
  }
  const inner = sha1Bytes(ipad.concat(utf8Bytes(message)));
  return sha1Bytes(opad.concat(inner)).map(value => value.toString(16).padStart(2, "0")).join("");
}

function getUserUuid(cookie) {
  const match = String(cookie || "").match(/(?:^|;\s*)user_uuid=([^;]+)/i);
  return match ? match[1] : "";
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function consume() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = [];
  const workerCount = Math.min(Math.max(1, limit), items.length);
  for (let i = 0; i < workerCount; i++) workers.push(consume());
  await Promise.all(workers);
  return results;
}

async function parseMissavRecommendations(videoId, cookie) {
  const timestamp = Math.floor(Date.now() / 1000);
  const path = "/" + RECOMBEE_DATABASE + "/batch/?frontend_timestamp=" + timestamp;
  const sign = hmacSha1Hex(RECOMBEE_TOKEN, path);
  const url = RECOMBEE_BATCH_URL + "?frontend_timestamp=" + timestamp + "&frontend_sign=" + sign;
  const userId = getUserUuid(cookie);
  if (!userId) {
    return [];
  }

  const requestBody = {
    requests: [{
      method: "POST",
      path: "/recomms/items/" + encodeURIComponent(getBaseVideoId(videoId)) + "/items/",
      params: {
        targetUserId: userId,
        count: 15,
        scenario: "mobile-watch-next",
        returnProperties: true,
        includedProperties: ["title_cn", "duration", "has_chinese_subtitle", "has_english_subtitle", "is_uncensored_leak", "dm"],
        cascadeCreate: true
      }
    }],
    distinctRecomms: true
  };
  try {
    if (typeof fetch !== "function") {
      return [];
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json", "Origin": MISSAV_SITE },
      body: JSON.stringify(requestBody)
    });
    if (!response || !response.ok) return [];
    const data = await response.json();
    const batchResponse = Array.isArray(data) ? data[0] : (data.responses && data.responses[0]);
    const recomms = batchResponse && batchResponse.json && batchResponse.json.recomms || [];
    const recommendations = recomms.slice(0, 15).map(recommendation => {
      const values = recommendation.values || {};
      const id = String(recommendation.id || "").trim();
      const displayId = getBaseVideoId(id).toUpperCase();
      const titleText = String(values.title_cn || "").trim();
      return {
        id: id.toUpperCase(),
        title: titleText ? displayId + " " + titleText : displayId,
        mediaType: "movie",
        type: "link",
        link: MISSAV_SITE + "/cn/" + displayId.toLowerCase()
      };
    }).filter(recommendation => recommendation.id);

    await mapWithConcurrency(recommendations, RECOMMENDATION_COVER_CONCURRENCY, async recommendation => {
      const coverPaths = await resolveRecommendationCoverPaths(recommendation.id);
      if (coverPaths) {
        recommendation.posterPath = coverPaths.posterPath || coverPaths.backdropPath || "";
      }
    });
    const result = recommendations
      .filter(recommendation => recommendation.posterPath)
      .slice(0, RECOMMENDATION_LIMIT);
    return result;
  } catch (error) {
    return [];
  }
}
async function fetchJav321Info(videoId) {
  const jav321Codes = getJav321VideoCodes(videoId);

  for (const jav321Code of jav321Codes) {
    if (!jav321Code) continue;

    try {
      const response = await Widget.http.get(JAV321_SITE + encodeURIComponent(jav321Code), {
        headers: {
          "User-Agent": MISSAV_UA,
          "Accept": "text/html,application/xhtml+xml"
        },
        allow_redirects: true
      });
      const html = response && response.data;
      const rating = parseJav321Rating(html);
      const actresses = parseJav321Actresses(html);
      if (rating !== undefined || actresses.length) return { rating: rating, actresses: actresses };
    } catch (error) {
      // Try the next Jav321 candidate.
    }
  }

  return { rating: undefined, actresses: [] };
}

function isDmmCoverUrl(url) {
  return /^https?:\/\/awsimgsrc\.dmm\.co\.jp\/pics_dig\/digital\/video\//i.test(String(url || ""));
}

function getImageProbeHeaders() {
  return {
    "User-Agent": MISSAV_UA,
    "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    "Range": "bytes=0-0"
  };
}

async function imageUrlExists(url) {
  if (!url) return false;

  try {
    await Widget.http.get(url, { headers: getImageProbeHeaders() });
    return true;
  } catch (e) {
    return false;
  }
}

async function resolveCoverPaths(videoId, fallbackCover) {
  fallbackCover = fallbackCover || getFourhoiCoverUrl(videoId);

  const mgsCovers = getMgsCoverUrls(videoId);
  if (mgsCovers) {
    return mgsCovers;
  }

  const dmmCoverCandidates = getDmmCoverUrlCandidates(videoId);
  if (!dmmCoverCandidates.length) {
    return {
      posterPath: fallbackCover,
      backdropPath: fallbackCover
    };
  }

  for (const dmmCovers of dmmCoverCandidates) {
    const exists = await Promise.all([
      imageUrlExists(dmmCovers.posterPath),
      imageUrlExists(dmmCovers.backdropPath)
    ]);

    if (exists[0] || exists[1]) {
      return {
        posterPath: exists[0] ? dmmCovers.posterPath : fallbackCover,
        backdropPath: exists[1] ? dmmCovers.backdropPath : fallbackCover
      };
    }
  }

  return {
    posterPath: fallbackCover,
    backdropPath: fallbackCover
  };
}

async function resolveRecommendationCoverPaths(videoId) {
  const baseVideoId = getBaseVideoId(videoId);
  const mgsCovers = getMgsCoverUrls(baseVideoId);
  if (mgsCovers) return mgsCovers;

  if (isFc2VideoId(baseVideoId)) {
    const fc2Cover = getFourhoiCoverUrl(baseVideoId.toLowerCase());
    if (await imageUrlExists(fc2Cover)) {
      return {
        posterPath: fc2Cover,
        backdropPath: fc2Cover
      };
    }
    return null;
  }

  const dmmCoverCandidates = getDmmCoverUrlCandidates(baseVideoId);
  for (const dmmCovers of dmmCoverCandidates) {
    if (await imageUrlExists(dmmCovers.posterPath)) {
      return dmmCovers;
    }
  }

  return null;
}

function getPageHeaders(referer, ua) {
  const headers = {
    "User-Agent": ua || MISSAV_UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Referer": referer || MISSAV_SITE + "/"
  };
  if ((ua || MISSAV_UA) === MISSAV_BROWSER_UA) {
    headers["Sec-Ch-Ua"] = "\"Microsoft Edge\";v=\"149\", \"Chromium\";v=\"149\", \"Not(A:Brand\";v=\"24\"";
    headers["Sec-Ch-Ua-Mobile"] = "?0";
    headers["Sec-Ch-Ua-Platform"] = "\"Windows\"";
    headers["Sec-Fetch-Dest"] = "document";
    headers["Sec-Fetch-Mode"] = "navigate";
    headers["Sec-Fetch-Site"] = "same-origin";
    headers["Upgrade-Insecure-Requests"] = "1";
  }
  return headers;
}

function getPlayHeaders(referer) {
  return {
    "User-Agent": MISSAV_UA,
    "Referer": referer || MISSAV_SITE + "/"
  };
}

function extractMissavUuid(html) {
  html = String(html || "");

  const nineyuMatch = html.match(/nineyu\.com\\?\/([a-f0-9-]{36})\\?\/seek\\?\/_0\.jpg/i);
  if (nineyuMatch && nineyuMatch[1]) return nineyuMatch[1];

  const surritMatch = html.match(/https?:\\?\/\\?\/surrit\.com\\?\/([a-f0-9-]{36})\\?\//i);
  if (surritMatch && surritMatch[1]) return surritMatch[1];

  const uuidMatches = html.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/ig);
  return uuidMatches && uuidMatches.length ? uuidMatches[0] : "";
}

function pickBestM3u8(masterText, uuid) {
  const prefix = `https://surrit.com/${uuid}/`;
  const lines = String(masterText || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  const videoLines = lines.filter(line => line.indexOf("/video.m3u8") >= 0);
  if (videoLines.length) {
    const best = videoLines[videoLines.length - 1];
    return /^https?:\/\//i.test(best) ? best : prefix + best.replace(/^\/+/, "");
  }

  const firstM3u8 = lines.find(line => line.indexOf(".m3u8") >= 0 && line[0] !== "#");
  if (firstM3u8) {
    return /^https?:\/\//i.test(firstM3u8) ? firstM3u8 : prefix + firstM3u8.replace(/^\/+/, "");
  }

  return prefix + "playlist.m3u8";
}

async function resolveMissavVideoUrl(html, detailUrl) {
  const uuid = extractMissavUuid(html);
  if (!uuid) return "";

  const playlistUrl = `https://surrit.com/${uuid}/playlist.m3u8`;

  try {
    const response = await Widget.http.get(playlistUrl, {
      headers: getPlayHeaders(detailUrl)
    });
    const masterText = (response && response.data) || "";
    return pickBestM3u8(masterText, uuid);
  } catch (e) {
    return playlistUrl;
  }
}

async function resolveVideoUrlWithFallback(html, detailUrl, $) {
  let videoUrl = await resolveMissavVideoUrl(html, detailUrl);
  if (videoUrl) return videoUrl;

  $('script').each((index, element) => {
    if (videoUrl) return false;
    const scriptContent = $(element).html() || "";
    if (scriptContent.includes('surrit.com') && scriptContent.includes('.m3u8')) {
      const surritMatches = scriptContent.match(/https:\/\/surrit\.com\/[a-f0-9\-]+\/[^"'\s]*\.m3u8/g);
      if (surritMatches && surritMatches.length > 0) {
        videoUrl = surritMatches[0];
        return false;
      }
    }
    if (!videoUrl && scriptContent.includes('eval(function')) {
      const uuidMatches = scriptContent.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g);
      if (uuidMatches && uuidMatches.length > 0) {
        videoUrl = `https://surrit.com/${uuidMatches[0]}/playlist.m3u8`;
      }
    }
  });

  return videoUrl;
}

function subtitleResponseData(response) {
  const data = response && response.data;
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}

function subtitleCodeMatches(value, videoCode) {
  const text = String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const code = String(videoCode || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  return code && text.indexOf(code) >= 0;
}

function absoluteUrl(href, baseUrl) {
  href = String(href || "").trim();
  if (!href || /^https?:\/\//i.test(href)) return href;
  if (href.indexOf("//") === 0) return "https:" + href;

  const origin = (String(baseUrl || "").match(/^(https?:\/\/[^/]+)/i) || [])[1] || "";
  if (href.charAt(0) === "/") return origin + href;
  return String(baseUrl || "").replace(/[?#].*$/, "").replace(/\/[^/]*$/, "/") + href.replace(/^\.\//, "");
}

async function findXunleiSubtitle(videoCode) {
  try {
    const response = await Widget.http.get(XUNLEI_SUBTITLE_API, {
      params: { name: videoCode },
      timeout: 10000
    });
    const data = subtitleResponseData(response);
    const rows = Array.isArray(data) ? data : data && (data.data || data.results || data.items);
    if (!Array.isArray(rows)) return "";

    const item = rows.find(row => {
      const url = row && (row.url || row.subtitle_url || row.download_url);
      return url && /\.srt(?:\?|$)/i.test(url) && subtitleCodeMatches([row.name, row.extra_name, url].join(" "), videoCode);
    });
    return item ? item.url || item.subtitle_url || item.download_url : "";
  } catch (error) {
    return "";
  }
}

async function findSubtitleCatSubtitle(videoCode) {
  try {
    const searchResponse = await Widget.http.get(SUBTITLECAT_SITE + "/index.php", {
      params: { search: videoCode },
      timeout: 10000
    });
    const searchDocId = Widget.dom.parse(String(subtitleResponseData(searchResponse) || ""));
    const searchLinks = Widget.dom.select(searchDocId, "table tbody tr td a[href]");
    let detailUrl = "";

    for (const link of searchLinks) {
      const href = (link.attributes || link.attrs || {}).href || "";
      if (subtitleCodeMatches((link.text || "") + " " + href, videoCode)) {
        detailUrl = absoluteUrl(href, SUBTITLECAT_SITE + "/");
        break;
      }
    }
    Widget.dom.remove(searchDocId);
    if (!detailUrl) return "";

    const detailResponse = await Widget.http.get(detailUrl, { timeout: 10000 });
    const detailDocId = Widget.dom.parse(String(subtitleResponseData(detailResponse) || ""));
    const links = Widget.dom.select(detailDocId, "a[href]");
    const candidates = [];

    links.forEach(link => {
      const href = (link.attributes || link.attrs || {}).href || "";
      const text = href + " " + (link.text || "");
      if (/\.srt(?:\?|$)/i.test(href) || /download\.php/i.test(href)) {
        candidates.push({ url: absoluteUrl(href, detailUrl), text: text });
      }
    });
    Widget.dom.remove(detailDocId);

    const preferred = candidates.find(item => /zh-CN|zh_CN|simplified|简体/i.test(item.text)) ||
      candidates.find(item => /zh|cn|chinese|中文/i.test(item.text)) ||
      candidates[0];
    return preferred ? preferred.url : "";
  } catch (error) {
    return "";
  }
}

async function resolveSubtitleUrl(videoCode) {
  return await findXunleiSubtitle(videoCode) || await findSubtitleCatSubtitle(videoCode);
}

function buildSubtitleMasterUrl(videoUrl, subtitleUrl, duration, hasBuiltInChineseSubtitle) {
  if (!String(SUBTITLE_WORKER_BASE_URL || "").trim()) return videoUrl;
  const query = [
    "duration=" + encodeURIComponent(String(duration)),
    "builtInChineseSubtitle=" + (hasBuiltInChineseSubtitle ? "1" : "0"),
    "subtitle=" + encodeURIComponent(subtitleUrl),
    "video=" + encodeURIComponent(videoUrl)
  ].join("&");
  return SUBTITLE_WORKER_BASE_URL.replace(/\/+$/, "") + "/master.m3u8?" + query;
}

async function loadDetail(link) {
  let rating;
  let genres = [];
  let actors = [];
  let directors = [];
  let recommendations = [];
  try {
    let originalLink = link;
    let coverFromList = "";
    let fallbackCoverFromList = "";
    let cookieFromList = MISSAV_COOKIE;
    let hasBuiltInChineseSubtitle = false;
    if (link && typeof link === "object") {
      originalLink = link.detailUrl || link.link || link.id || link.url || "";
      coverFromList = link.backdropPath || link.posterPath || "";
      fallbackCoverFromList = link.fallbackCoverPath || "";
      cookieFromList = link.cookie || MISSAV_COOKIE;
      hasBuiltInChineseSubtitle = link.hasBuiltInChineseSubtitle === true;
    }
    const markedLink = readAndRemoveBuiltInChineseSubtitleMarker(originalLink);
    link = markedLink.url;
    if (markedLink.hasBuiltInChineseSubtitle) {
      hasBuiltInChineseSubtitle = true;
    }

    const response = await requestMissavPage(link, { cookie: cookieFromList }, MISSAV_SITE + "/");

    const videoId = extractVideoId(link);
    const videoCode = getBaseVideoId(videoId).toUpperCase();
    const $ = Widget.html.load(response.data);
    const duration = Number($('meta[property="og:video:duration"]').attr('content'));

    let title = $('meta[property="og:title"]').attr('content') || '';
    if (!title) {
      title = $('h1').first().text().trim();
    }
    if (!title) {
      title = $('title').text().replace(/\s*-\s*MissAV.*$/i, '').trim();
    }

    const releaseDate = String(
      $('time').first().attr('datetime') ||
      $('time').first().text() ||
      ''
    ).trim() || undefined;

    let officialDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    officialDescription = String(officialDescription || '').replace(/\s+/g, ' ').trim();
    if (!officialDescription) {
      officialDescription = title || `${videoCode}`;
    }

    genres = parseMissavGenres(response && response.data);
    const missavPeople = parseMissavPeople(response && response.data);
    const mgsCovers = getMgsCoverUrls(videoId);
    const listCover = isDmmCoverUrl(coverFromList) ? "" : normalizeImageUrl(coverFromList);
    const fallbackCover = String(fallbackCoverFromList || "").trim() || listCover || getFourhoiCoverUrl(videoId);
    const recommendationsPromise = parseMissavRecommendations(videoId, cookieFromList);
    const actorSourcePromise = mgsCovers
      ? fetchAvBaseActresses(videoId)
      : fetchJav321Info(videoId);
    const coverPathsPromise = resolveCoverPaths(videoId, fallbackCover);
    const actorsPromise = actorSourcePromise.then(async actorSourceResult => {
      let actorSources = [];
      let ratingValue;
      if (mgsCovers) {
        actorSources = actorSourceResult;
      } else {
        actorSources = actorSourceResult.actresses;
        ratingValue = actorSourceResult.rating;
      }
      return {
        actors: await buildActorsInfo(missavPeople.actresses, actorSources, cookieFromList),
        rating: ratingValue
      };
    });
    const videoUrlPromise = resolveVideoUrlWithFallback(response.data, link, $);
    const subtitlePromise = resolveSubtitleUrl(videoCode);

    const [recommendationsResult, actorResult, coverPaths, videoUrl, subtitleUrl] = await Promise.all([
      recommendationsPromise,
      actorsPromise,
      coverPathsPromise,
      videoUrlPromise,
      subtitlePromise
    ]);

    recommendations = recommendationsResult;
    actors = actorResult.actors;
    if (!mgsCovers) rating = actorResult.rating;
    directors = buildDirectorsInfo(missavPeople.directors);

    if (!response || !response.data || response.data.includes('Just a moment')) {
      return {
        id: link,
        type: "detail",
        videoUrl: "",
        url: "",
        playUrl: "",
        title: `${videoCode}`,
        description: `番号: ${videoCode}\n播放页被风控，未解析到 m3u8`,
        posterPath: coverPaths.posterPath,
        backdropPath: coverPaths.backdropPath,
        mediaType: "movie",
        duration: 0,
        durationText: "",
        previewUrl: "",
        playerType: "none",
        rating: rating,
        genres: genres,
        tags: genres,
        actors: actors,
        directors: directors,
        recommendations: recommendations,
        link: link
      };
    }

    const playbackUrl = videoUrl && subtitleUrl && String(SUBTITLE_WORKER_BASE_URL || "").trim()
      ? buildSubtitleMasterUrl(videoUrl, subtitleUrl, duration, hasBuiltInChineseSubtitle)
      : videoUrl;
    const playHeaders = playbackUrl ? getPlayHeaders(link) : undefined;

    return {
      id: link,
      type: "detail",
      videoUrl: playbackUrl || "",
      url: playbackUrl || "",
      playUrl: playbackUrl || "",
      title: title || `${videoCode}`,
      description: videoUrl ? officialDescription : `${officialDescription}\n未解析到 m3u8，请检查 CK 或稍后重试`,
      releaseDate: releaseDate,
      posterPath: coverPaths.posterPath,
      backdropPath: coverPaths.backdropPath,
      mediaType: "movie",
      duration: duration,
      durationText: "",
      previewUrl: "",
      playerType: videoUrl ? "system" : "none",
      rating: rating,
      genres: genres,
      tags: genres,
      actors: actors,
      directors: directors,
      recommendations: recommendations,
      link: link,
      customHeaders: playHeaders,
      headers: playHeaders
    };

  } catch (error) {
    const videoId = extractVideoId(link);
    const videoCode = getBaseVideoId(videoId).toUpperCase();
    const fallbackCover = getFourhoiCoverUrl(videoId);

    return {
      id: link,
      type: "detail",
      videoUrl: "",
      url: "",
      playUrl: "",
      title: `${videoCode}`,
      description: `番号: ${videoCode}\n详情页请求失败，未解析到 m3u8`,
      releaseDate: undefined,
      posterPath: fallbackCover,
      backdropPath: fallbackCover,
      mediaType: "movie",
      duration: 0,
      durationText: "",
      previewUrl: "",
      playerType: "none",
      rating: rating,
      genres: genres,
      tags: genres,
      actors: actors,
      directors: directors,
      recommendations: recommendations,
      link: link
    };
  }
}

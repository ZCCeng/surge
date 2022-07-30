const scriptName = "去除APP启动广告";
let magicJS = MagicJS(scriptName, "INFO");

(() => {
  let response = null;
  if (magicJS.isResponse) {
    switch (true) {
      case /^https?:\/\/wmapi\.meituan\.com\/api\/v\d+\/loadInfo?/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          obj.data.startpicture.ad = [];
          obj.data.startpicture.mk = [];
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`美团外卖开屏去广告出现异常：${err}`);
        }
        break;
    }
  } else {
    magicJS.logWarning("触发意外的请求处理，请确认脚本或复写配置正常。");
  }
  if (response) {
    magicJS.done(response);
  } else {
    magicJS.done();
  }
})();

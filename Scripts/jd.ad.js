const scriptName = "去除APP启动广告";
let magicJS = MagicJS(scriptName, "INFO");

(() => {
  let response = null;
  if (magicJS.isResponse) {
    switch (true) {
      case /^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=start/.test(magicJS.request.url):
        try {
          let obj = JSON.parse(magicJS.response.body);
          for (let i = 0; i < obj.images.length; i++) {
            for (let j = 0; j < obj.images[i].length; j++) {
              if (obj.images[i][j].showTimes) {
                obj.images[i][j].showTimes = 0;
                obj.images[i][j].onlineTime = "2030-12-24 00:00:00";
                obj.images[i][j].referralsTime = "2030-12-25 00:00:00";
                obj.images[i][j].time = 0;
              }
            }
          }
          obj.countdown = 100;
          obj.showTimesDaily = 0;
          response = { body: JSON.stringify(obj) };
        } catch (err) {
          magicJS.logError(`京东开屏去广告出现异常：${err}`);
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

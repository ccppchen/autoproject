/*======================================================
************   remjs   ************
======================================================*/
(function (){
  var _self = this;
  _self.width = 750; //设置默认最大宽度
  _self.fontSize = 100; //默认字体大小
  _self.widthProportion = function() {
      var p1 = (document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
      var p = p1.toFixed(6);
      return p > 1 ? 1 : p < 0.42667 ? 0.42667 : p;
  };
  _self.changePage = function() {
      document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
  }
  _self.changePage();
  window.addEventListener("resize", function() {
      _self.changePage();
  }, false);
}());



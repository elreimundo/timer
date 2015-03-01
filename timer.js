(function () {

  function Timer(elt, mins) {
    this.model = new Timer.Model(mins);
    this.view = new Timer.View(elt);
    this.view.render(this.model);
  }

  Timer.prototype.tick = function () {
    this.view.render(this.model.tick());
    setTimeout(this.tick.bind(this), 1000);
  }

  Timer.Model = function(mins) {
    this.mins = mins;
    this.secs = 0;
  }

  Timer.Model.prototype.tick = function () {
    if (this.secs === 0) {
      if (this.mins === 0) {
        return this;
      }
      this.secs = 59;
      this.mins--;
    } else {
      this.secs--;
    }
    return this;
  }

  Timer.View = function(elt) {
    this.elt = elt;
  }

  Timer.View.prototype.render = function (model) {
    var seconds = model.secs < 10 ? '0' + model.secs : model.secs;
    this.elt.innerHTML = model.mins + ':' + seconds;
  }

  var timerText = document.getElementsByClassName('timer-text')[0];
  timer = new Timer(timerText, 4);

  timerText.addEventListener('click', timer.tick.bind(timer));
})();
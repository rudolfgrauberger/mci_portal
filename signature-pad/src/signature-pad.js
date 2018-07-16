(function(exports){
  var SignaturePad = function() {
    if(!(this instanceof SignaturePad)){
      return new SignaturePad();
    }

    this.uuid      = this.Uuid();
    this.script    = this.CurrentlyExecutedScript();
    this.init();

    return this;
  };

  SignaturePad.prototype.init = function() {
    if (this.script) {
      this.script.className += " signature-pad-script";
      this.script.id        = "signature-pad-script-"+this.uuid;

      this.draw();
      this.events();
      SignatureMark(this.canvas);
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  MicroEvent.mixin(SignaturePad);
  exports.SignaturePad = SignaturePad;

}(this));

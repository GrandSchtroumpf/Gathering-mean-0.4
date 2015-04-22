'use strict';
var lib, images, createjs;
(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes

// library properties:
    lib.properties = {
        width: 600,
        height: 900,
        fps: 30,
        color: '#FFFFFF',
        manifest: []
    };



// symbols:



// stage content:
    (lib.Sansnom3 = function() {
        this.initialize();

        // Card
        this.shape = new cjs.Shape();
        this.shape.graphics.f().s('#1D1D1B').ss(3).p('EAjKAF3MhGTAAAIAArtMBGTAAAg');
        this.shape.setTransform(300,450);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f('#CC3517').s().p('EgjJAF3IAArtMBGSAAAIAALtg');
        this.shape_1.setTransform(300,450);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f('#020203').s().p('ACbDYQgJgKAAgNIAag9QAag8ABhIQgBhHgag7Qgbg9ABgCQAAgMAJgJQAJgLAPAAQAXAAAPAgQAUApAKAfQASA6AAA/QAABAgSA6QgKAggUAnQgJAUgKAHQgJAGgKAAQgPAAgJgKgAhBDSIhkhRIhCAAQgNAAgKgJQgKgKAAgOIAAi/QAAgNAKgLQAKgJANAAIBCAAIBkhRIAQgLQAIgFAJAAQAPAAAKAKQAHAKAAAMIAAGCQAAANgHAKQgKAKgPAAQgNAAgUgQgAjFBBIA4AAIBMA9IAAj6IhMA9Ig4AAgAApCXQgIgKgBgMQAAgEARgmQARglAAgyQAAgwgRgmQgRgmAAgEQABgMAIgJQAKgLAPAAQAMAAAJAHQAJAHAHASQAdA9AABDQAABEgdA9QgHASgJAHQgJAIgMAAQgPAAgKgLg');
        this.shape_2.setTransform(478.2,76.6);

        this.text = new cjs.Text('K', '200px "Myriad Pro"', '#1D1D1B');
        this.text.lineHeight = 240;
        this.text.setTransform(242.8,117.9);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f('#1D1D1B').s().p('Egj6Aj7MAAAhH2MBH2AAAMAAABH2gEgjJAjKMBGSAAAMAAAhGSMhGSAAAg');
        this.shape_3.setTransform(300,263.5);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f('#FFFFFF').s().p('EgjJAjKMAAAhGSMBGSAAAMAAABGSg');
        this.shape_4.setTransform(300,263.5);

        this.shape_5 = new cjs.Shape();
        this.shape_5.graphics.f('#1D1D1B').s().p('Egj6AMfIAA4+MBH2AAAIAAY+gEgjJALuMBGSAAAIAA3bMhGSAAAg');
        this.shape_5.setTransform(300,719.4);

        this.shape_6 = new cjs.Shape();
        this.shape_6.graphics.f('#FFFFFF').s().p('EgjJALuIAA3bMBGSAAAIAAXbg');
        this.shape_6.setTransform(300,719.4);

        this.shape_7 = new cjs.Shape();
        this.shape_7.graphics.f('#1D1D1B').s().p('Egj6AImIAAxLMBH2AAAIAARLgEgjJAHzMBGSAAAIAAvmMhGSAAAg');
        this.shape_7.setTransform(300,566.2);

        this.shape_8 = new cjs.Shape();
        this.shape_8.graphics.f('#FFFFFF').s().p('EgjJAHzIAAvmMBGSAAAIAAPmg');
        this.shape_8.setTransform(300,566.2);

        this.shape_9 = new cjs.Shape();
        this.shape_9.graphics.f('#020203').s().p('Egu3BGUMAAAiMnMBdvAAAMAAACMngEgtTBEwMBanAAAMAAAiJfMhanAAAg');
        this.shape_9.setTransform(300,450);

        this.shape_10 = new cjs.Shape();
        this.shape_10.graphics.f('#999999').s().p('Egu3BGUMAAAiMnMBdvAAAMAAACMng');
        this.shape_10.setTransform(300,450);

        this.addChild(this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.text,this.shape_2,this.shape_1,this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(300,450,600,900);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});


// -----------------------------------------------------------------------------
// 003 : dat.gui 테스트
// -----------------------------------------------------------------------------

let DatGUI = require('../../lib/dat.gui/build/dat.gui');

let gui2:any;

let TestComponent:any = function() {
    this.enable         = false;
    this.name           = 'Test';
    this.x              = 0;
    this.y              = 0;
    this.width          = 10;
    this.height         = 20;
    this.speed          = 0.8;
    this.cssColor       = "#ffaa00"; // CSS string
    this.rgbColor       = [0,128,255]; // RGB array
    this.rgbaColor      = [0,128,255, 0.5]; // RGBA array
    this.hsvColor       = {h:350,s:0.9,v:0.3}; // Hue, saturation, value

    this.action         = function() {
        // ...
    };
    this.strength       = 0.8;
    this.growth         = 0.8;
    this.maxSize        = 0.25;
    this.kind           = "human";
    this.type           = 0;
    this.value1         = 0;
    this.setValue1      = 0;
    this.value2         = 0;
};

let Test2Component:any = function() {
    this.enable         = false;
    this.name           = 'Test2';
    this.speed          = 1.6;
    this.update         = function() {
        // 모든 컨트롤 업데이트
        for( var i in gui2.__controllers ) {
            gui2.__controllers[i].updateDisplay();
        }
    };
};

window.onload = function() {
    {
        let component = new TestComponent();

        let gui = new DatGUI.GUI({
            width : 300,
        });
        gui.remember(component); // 저장이 필요할때만 사용

        gui.add(component, 'enable');
        gui.add(component, 'name');
        let f1 = gui.addFolder('transform');
        f1.add(component, 'x', -100, 100);
        f1.add(component, 'y', -100, 100);
        f1.add(component, 'width', 1, 100);
        f1.add(component, 'height', 1, 100);
        f1.open();

        let f2 = gui.addFolder('options');
        f2.add(component, 'speed', -50, 50);
        f2.add(component, 'strength').step(5);          // 입력 : 스탭형
        f2.add(component, 'growth', -5, 5);             // 입력 : 범위형
        f2.add(component, 'maxSize').min(0).step(0.25); // 입력 : 혼합형
        f2.add(component, 'kind', [ 'human', 'elf', 'orc' ] );    // 선택 : value형
        f2.add(component, 'type', {hero:0,npc:1,monster:2} );     // 선택 : keyValue형
        f2.add(component, 'action');

        let f3 = gui.addFolder('colors');
        f3.addColor(component, 'cssColor');
        f3.addColor(component, 'rgbColor');
        f3.addColor(component, 'rgbaColor');
        f3.addColor(component, 'hsvColor');

        let f4 = gui.addFolder('events');
        f4.add(component,'value1', -5, 5).listen();
        let controller1 = f4.add(component,'setValue1', -5, 5);
        controller1.onChange( (value:any) => {
            //console.log('onChange : '+value);
        });
        controller1.onFinishChange( (value:any) => {
            //console.log('onFinishChange : '+value);
            component.value1 = value;
        });
        let controller2 = f4.add(component,'value2', 0, 1).listen();

        var update = () => {
            requestAnimationFrame(update);
            component.value2 = Math.random();
            //console.log(component.growth);
        }
        update();
    }
    {
        let component = new Test2Component();

        gui2 = new DatGUI.GUI({
            load : JSON,
            preset : 'Flow',
            width : 300,
        });
        gui2.remember(component); // 저장이 필요할때만 사용
        gui2.add(component, 'enable');
        gui2.add(component, 'name');
        gui2.add(component, 'speed', -5, 5);
        gui2.add(component, 'update');
    }
};
import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check component composition', () => {
  $t.assert('By append', () => {
    (class VCLevelA extends VesselComponent {
      render() { return this.props.children };
    }).expose('vs-append-level-a');
  
    (class VCLevelB extends VesselComponent {
      render() { return this.props.children };
    }).expose('vs-append-level-b');
  
    (class VCLevelC extends VesselComponent {
      static style = [`
        vs-append-level-c {
          border: solid 1px #bbb;
          display: block;
          padding: 16px;
          max-width: 300px;
          border-radius: 8px;
          margin: 16px 0;
        }
      `];
  
      render() { return 'Checking component composition' };
    }).expose('vs-append-level-c');  
  
    const a = document.createElement('vs-append-level-a');
    const b = document.createElement('vs-append-level-b');
    const c = document.createElement('vs-append-level-c');
  
    a.append(b);
    b.append(c);
    $t.assert(a);

    const result = a.firstChild === b && b.firstChild === c;
    a.remove();
    return result;
  });

  $t.assert('By props.children', () => {
    class VCLevelA extends VesselComponent {
      render() { return this.props.children };
    }
  
    class VCLevelB extends VesselComponent {
      render() { return this.props.children };
    }
    
    class VCLevelC extends VesselComponent {
      static style = [`
        vs-children-level-c {
          border: solid 1px #bbb;
          display: block;
          padding: 16px;
          max-width: 300px;
          border-radius: 8px;
          margin: 16px 0;
        }
      `];
  
      render() { return this.props.children };
    }
    
    VCLevelA.expose('vs-children-level-a');
    VCLevelB.expose('vs-children-level-b');
    VCLevelC.expose('vs-children-level-c');    
    
    const div = Object.assign(document.createElement('div'), {
      innerHTML: `
        <vs-children-level-a>
          <vs-children-level-b> 
            <vs-children-level-c>Checking component composition</vs-children-level-c>  
          </vs-children-level-b>
        </vs-children-level-a>
      `
    });

    $t.assert(div);

    const result = (
      div.firstElementChild.tagName.toLowerCase() === 'vs-children-level-a' && 
      div.firstElementChild.firstElementChild.tagName.toLowerCase() === 'vs-children-level-b' && 
      div.firstElementChild.firstElementChild.firstElementChild.tagName.toLowerCase() === 'vs-children-level-c'
    );

    div.remove();
    return result;
  });  

  $t.assert('Props Children vs Element Children', () => {
    const expectedContent = 'Element initial HTML was overwrited by render';

    (class vsPropsVsChildren extends VesselComponent {
      render() { return expectedContent };
    }).expose('vs-props-vs-children');

    const $vsPropsVsChildren = Object.assign(document.createElement('vs-props-vs-children'), {
      innerHTML: 'Initial InnerHTML'
    });

    $t.assert($vsPropsVsChildren);
    const result = $vsPropsVsChildren.textContent === expectedContent;
    $vsPropsVsChildren.remove();

    return result;
  });
});

import Component from '@glimmer/component';
import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Schema, DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';
import { action } from '@ember-decorators/object';

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks
});

export default class EditorComponent extends Component {
  @action
  setupEditor(el) {
    let contentEl = el.querySelector('.content');
    this.editorView = new EditorView(el, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(contentEl),
        plugins: exampleSetup({schema: mySchema})
      })
    });
  }

  @action
  destroyEditor() {
    this.editorView.destroy();
  }
}

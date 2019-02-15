import Component from '@glimmer/component';
import { action } from '@ember-decorators/object';
import { hash } from 'rsvp';

export default class MapComponent extends Component {
  constructor() {
    super(...arguments);
    this.olImportPromise = this.importOl();
  }

  async importOl() {
    let ol = await hash({
      ol: import('ol'),
      layer: import('ol/layer'),
      source: import('ol/source')
    });

    return ol;
  }

  @action
  async setupMap(el) {
    let lib = await this.olImportPromise;
    let map = new lib.ol.Map({
      target: el,
      layers: [
        new lib.layer.TileLayer({
          source: new lib.source.XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new lib.ol.View({
        center: [0, 0],
        zoom: 2
      })
    });

    this.map = map;
  }
}

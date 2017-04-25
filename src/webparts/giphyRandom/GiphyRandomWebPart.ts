import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import pnp from 'sp-pnp-js';

import * as strings from 'giphyRandomStrings';
import GiphyRandom from './components/GiphyRandom';
import { IGiphyRandomProps } from './components/IGiphyRandomProps';
import { IGiphyRandomWebPartProps } from './IGiphyRandomWebPartProps';

export default class GiphyRandomWebPart extends BaseClientSideWebPart<IGiphyRandomWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGiphyRandomProps> = React.createElement(
      GiphyRandom,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

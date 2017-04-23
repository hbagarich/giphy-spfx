declare interface IGiphyRandomStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'giphyRandomStrings' {
  const strings: IGiphyRandomStrings;
  export = strings;
}

declare interface IGiphyRandomStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameFieldLabel: string;
}

declare module 'giphyRandomStrings' {
  const strings: IGiphyRandomStrings;
  export = strings;
}

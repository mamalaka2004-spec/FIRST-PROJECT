export interface CaptionItem {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const captions: CaptionItem[] = [
  { text: "Sua agência", startFrame: 0, endFrame: 30 },
  { text: "merece o melhor", startFrame: 30, endFrame: 60 },
  { text: "sistema de gestão", startFrame: 60, endFrame: 95 },
  { text: "Manager Fashion", startFrame: 100, endFrame: 160 },
  { text: "Booking", startFrame: 170, endFrame: 200 },
  { text: "Casting", startFrame: 200, endFrame: 230 },
  { text: "CRM", startFrame: 230, endFrame: 260 },
  { text: "Website", startFrame: 260, endFrame: 290 },
  { text: "+200 agências", startFrame: 300, endFrame: 345 },
  { text: "+30 países", startFrame: 345, endFrame: 385 },
  { text: "confiam no MF", startFrame: 385, endFrame: 420 },
  { text: "Teste grátis", startFrame: 430, endFrame: 470 },
  { text: "por 7 dias", startFrame: 470, endFrame: 510 },
  { text: "managerfashion.com", startFrame: 510, endFrame: 540 },
];

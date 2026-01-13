export type AudioSegment = {
  segment_title: string;
  caption: string;
  keywords: string[];
  start_timestamp: string; 
  end_timestamp: string;
};


export type ImageAIResult = {
  title: string;
  description: string;
  keywords: string[];
};


export type VideoScene = {
  scene_title: string;
  caption: string;
  keywords: string[];
  start_timestamp: string;
  end_timestamp: string;
};

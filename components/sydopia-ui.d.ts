/** Public API for the framework-agnostic Sydopia UI components. */
export type ReducedMotionMode = 'system' | 'always' | 'never';

export interface ProjectItem {
  title: string;
  image: string;
  hoverImage?: string;
  alt?: string;
  href?: string;
  linkLabel?: string;
  tags?: string[];
}
export interface MarqueeOptions {
  items?: ProjectItem[];
  /** Pixels per second; clamped to 5–250. */
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
  cardWidth?: number;
  aspectRatio?: string;
  radius?: number;
  hoverLift?: number;
  pauseOnHover?: boolean;
  showTags?: boolean;
  reducedMotion?: ReducedMotionMode;
}
export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  label?: string;
}
export interface PaperOptions {
  items?: TestimonialItem[];
  colors?: string[];
  angles?: number[];
  maxWidth?: number;
  cardHeight?: number;
  padding?: number;
  fontSize?: number;
  duration?: number;
  label?: string;
  stickerText?: string;
  stickerSrc?: string;
  stickerColor?: string;
  draggableSticker?: boolean;
  reducedMotion?: ReducedMotionMode;
}
export interface ComponentHandle<T> {
  /** Merge partial options and re-render the component. */
  update(options: Partial<T>): void;
  /** Remove animation, listeners and rendered content. */
  destroy(): void;
}
export interface PaperHandle extends ComponentHandle<PaperOptions> {
  /** Send the topmost card to the back of the stack. */
  next(): void;
}
export declare function createProjectMarquee(
  target: Element | string,
  options?: MarqueeOptions
): ComponentHandle<MarqueeOptions>;
export declare function createPaperTestimonials(
  target: Element | string,
  options?: PaperOptions
): PaperHandle;

export enum BackgroundType {
	Color,
	Image
}

export enum SlideLayout {
	Single,
	Dual
}

export enum SlotContentType {
	Bullet,
	Text,
	Code,
	Image,
	None
}

export interface SlideContentSlot {
	contentType: SlotContentType,
	content?: string | null
}

export interface SlidePanel {
	primary: boolean;
	slot: SlideContentSlot,
	backgroundType: BackgroundType,
	background?: string | null | undefined
}

interface SlideData {
	index: number,
	title: string,
	background: string,
	layout: SlideLayout,
	content: SlidePanel[]
}

export default SlideData;

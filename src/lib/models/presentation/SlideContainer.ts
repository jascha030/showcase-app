import { getContext, setContext } from 'svelte';

export enum NavigateDirection {
	Next,
	Previous
}

class SlideContainer {
	private _startIndex: number = -1;
	private _currentIndex: number = 0;

	get startIndex(): number {
		return this._startIndex
	}

	get currentIndex(): number {
		return this._currentIndex
	}

	get displayIndex(): number {
		return this._currentIndex + 1
	}

	constructor() {
		setContext('SlideIndex', {
			index: (): number => {
				this._startIndex++;

				return this._startIndex
			},
			current: () => this._currentIndex
		})
	}

	public newIndex = (): number => {
		const { index } = getContext('SlideIndex');

		return index();
	}

	public mutateIndex = (direction: NavigateDirection): Boolean => {
		if (direction === NavigateDirection.Next) {
			if (this._currentIndex >= this._startIndex) {
				return false;
			}

			this._currentIndex++;
		}

		if (direction === NavigateDirection.Previous) {
			if (this._currentIndex <= 0) {
				return false;
			}

			this._currentIndex--;
		}

		return true;
	};

	public toggleSlideClasses = (direction: NavigateDirection, currentSlide: Element): void => {
		const navigatingSlide = direction === NavigateDirection.Next
			? currentSlide.nextElementSibling
			: currentSlide.previousElementSibling;

		currentSlide.classList.remove('translate-x-0');
		currentSlide.classList.add(direction === NavigateDirection.Next ? '-translate-x-full' : 'translate-x-full');

		navigatingSlide?.classList.remove(direction === NavigateDirection.Next ? 'translate-x-full' : '-translate-x-full');
		navigatingSlide?.classList.add('translate-x-0');
	}

	public navigate = (direction: NavigateDirection) => this.mutateIndex(direction) && this.toggleSlideClasses(direction, document.querySelector('.slide.translate-x-0') as Element)

	public next = () => this.navigate(NavigateDirection.Next)

	public prev = () => this.navigate(NavigateDirection.Previous)
}

export default SlideContainer;

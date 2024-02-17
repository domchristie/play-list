# `<play-list>`
A no-UI Web Component for coordinating lists of HTML media elements (`<audio>` or `<video>`).

- Automatically plays the next element when the current one ends
- Pauses the current element when another one starts

## Usage
```html
<play-list loop>
  <audio src="example-1.mp3" controls></audio>
  <audio src="example-2.mp3" controls></audio>
  <audio src="example-3.mp3" controls></audio>
  …
</playlist>
```

## Attributes
The following HTML attributes are supported on the `<play-list>` element:

### `autoplay` (default: `true`)
Controls whether the next element will play when the current one finishes. Disable autoplay with `autoplay="false"`.

### `loop` (default: `false`)
Controls whether to loop back round to the first element when the last one ends. Enable looping with by adding an empty `loop` attribute, or with `loop="true"`.

## Properties
The `<play-list>` element includes the following properties:

### `autoplay` (default: `true`)
Get or set the `autoplay` attribute.

### `loop` (default: `false`)
Get or set the `loop` attribute.

### `elements`
An array of `audio` and `video` elements in the list.

### `current`
The most recently started media element.

## Methods

### `next()`
Play the next element in the list.

## License

Copyright © 2024+ Dom Christie and released under the MIT license.

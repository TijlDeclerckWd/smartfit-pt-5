import {FormControl} from '@angular/forms';

export function matchYoutubeUrl(c: FormControl) {
  console.log('entered the validator', c);
  const url = c.value;

  if (!!url) {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (url.match(p)) {
      return null;
    }
    return { matchYoutubeUrl: { value: true } };
  } else {
    return null;
  }
}

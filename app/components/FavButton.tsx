"use client";

import { useBag } from "./BagProvider";
import Icon from "./Icon";

export default function FavButton({ slug, name, withLabel = false }: { slug: string; name: string; withLabel?: boolean }) {
  const { favs, toggleFav } = useBag();
  const on = favs.includes(slug);
  return (
    <button
      type="button"
      className={withLabel ? "btn btn-line fav-wide" : "fav"}
      aria-pressed={on}
      aria-label={withLabel ? undefined : on ? `Remove ${name} from favourites` : `Save ${name} to favourites`}
      onClick={() => toggleFav(slug)}
    >
      <Icon name="bookmark" size={withLabel ? 16 : 17} filled={on} />
      {withLabel && <span>{on ? "Saved" : "Save"}</span>}
    </button>
  );
}

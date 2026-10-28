"use client";

import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/app/lib/catalog";
import { formatINR, priceOf } from "@/app/lib/price";
import { useBag } from "./BagProvider";
import Icon from "./Icon";

export default function AddedToast() {
  const { toast, dismiss } = useBag();
  const product = toast && getProduct(toast.slug);
  if (!toast || !product) return null;
  return (
    <div key={toast.id} className="toast" role="status">
      <div className="toast-media">
        <Image src={product.images[0]} alt="" fill sizes="96px" />
      </div>
      <div className="toast-body">
        <p className="caps">Added to your bag</p>
        <p className="toast-name">{product.name}</p>
        <p className="toast-meta">
          {toast.purity}
          {toast.size && ` · Size ${toast.size}`} · {formatINR(priceOf(product, toast.purity).total)}
        </p>
        <Link href="/bag" className="link-line" onClick={dismiss}>
          View bag
        </Link>
      </div>
      <button type="button" className="toast-close" aria-label="Close" onClick={dismiss}>
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}

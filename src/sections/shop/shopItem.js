import Image from 'next/image';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';

import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '@/lib/server/sanity';
import { PortableText } from '@portabletext/react';
import { useState } from 'react';

const imageBuilder = imageUrlBuilder(sanityClient);

const ShopItem = ({ item }) => {
  const imageAsset = imageBuilder.image(item?.image?.asset);

  const [quantity, setQuantity] = useState(0);

  const decrease = () => setQuantity((state) => state - 1);
  const increase = () => setQuantity((state) => state + 1);

  const image = imageAsset?.options?.source ? imageAsset?.url() : null;
  return (
    <section className="px-5 py-10 md:px-0">
      <div className="container flex mx-auto space-y-10 md:space-y-0 md:space-x-10 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row flex-1 gap-4">
          <div className="flex" style={{ flex: '0.5 1 0' }}>
            <div className="relative w-full hidden md:inline-block">
              <Image
                name={item.name}
                layout="fixed"
                loading="lazy"
                objectFit="cover"
                src={image || '/images/livingpupil-homeschool-logo.png'}
              />
            </div>
            <div className="relative inline-block w-full md:hidden">
              <Image
                name={item.name}
                loading="lazy"
                width={700}
                height={475}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                className="flex md:hidden"
                src={image || '/images/livingpupil-homeschool-logo.png'}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex text-4xl font-bold">{item.name}</div>
            <div className="flex text-2xl text-gray-600 py-2">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
              }).format(item.price)}
            </div>
            <div className="flex flex-wrap py-2">
              {item?.categories?.map((category, index) =>
                category ? (
                  <span
                    key={index}
                    className="px-3 py-1 mb-2 mr-3 text-xs text-gray-600 bg-gray-100 rounded-full"
                  >
                    {category}
                  </span>
                ) : null
              )}
            </div>
            <div className="text-sm py-2 space-y-3 justify-center text-justify">
              <PortableText value={item.description} />
            </div>
            <div className="w-full md:w-1/4 flex flex-row mt-4">
              <button
                className="p-2 text-white bg-primary-400 border border-primary-400 disabled:opacity-25"
                disabled={quantity === 0}
                onClick={decrease}
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <div className="w-full flex items-center justify-center px-6 border border-primary-400 font-bold">
                {quantity}
              </div>
              <button
                className="p-2 text-white bg-primary-400 border border-primary-400 disabled:opacity-25"
                disabled={quantity === item.inventory}
                onClick={increase}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex mt-4">
              <button className="w-full md:w-1/4 py-2 text-white rounded-lg bg-primary-500 hover:bg-secondary-600 disabled:opacity-25">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="sticky flex-col justify-between hidden p-5 space-y-5 border-4 rounded-lg md:flex border-primary-500">
            <h2 className="text-3xl font-bold">Shopping Cart</h2>
            <div className="flex flex-col items-start justify-between w-full h-full space-y-3">
              <div>Your cart is empty</div>
            </div>
            <hr className="border-2 border-dashed" />
            <div className="flex justify-between text-2xl font-bold">
              <div>Total</div>
              <div></div>
            </div>
            <button className="py-2 text-lg rounded bg-secondary-500 hover:bg-secondary-400 disabled:opacity-25">
              Review Shopping Cart
            </button>
            <button className="py-2 text-lg bg-gray-200 rounded hover:bg-gray-100 disabled:opacity-25">
              Clear Shopping Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopItem;

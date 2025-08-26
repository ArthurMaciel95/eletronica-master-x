import React from "react";

const brands = [
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg",
  },
  {
    name: "LG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/600px-LG_logo_%282014%29.svg.png?20231109111316",
  },
  {
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "Philips",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png",
  },
  {
    name: "Panasonic",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Panasonic_logo_%28Blue%29.svg/2560px-Panasonic_logo_%28Blue%29.svg.png",
  },
  {
    name: "Sharp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Sharp_Corporation.svg",
  },
  {
    name: "TCL",
    logo: "https://logodownload.org/wp-content/uploads/2016/09/tcl-logo-1.png",
  },
  {
    name: "Hisense",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hisense.svg/1200px-Hisense.svg.png",
  },
  {
    name: "AOC",
    logo: "https://logodownload.org/wp-content/uploads/2014/09/aoc-logo-1.png",
  },
  {
    name: "JVC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/JVC_Logo.svg/1200px-JVC_Logo.svg.png",
  },
];

export default function BrandGrid() {
  return (
    <div className="grid grid-cols-3 gap-8 mt-8">
      {brands.map((brand, idx) => {
        const vertical = idx % 3 === 1 ? "items-end" : "items-start";
        return (
              <div key={brand.name + idx} className={`flex flex-col ${vertical} min-w-[120px]`}>
                <div className="bg-white rounded-lg p-3 flex items-center justify-center mb-2 shadow">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    title={brand.name}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
        );
      })}
    </div>
  );
}

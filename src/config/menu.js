// ─────────────────────────────────────────────────────────────────────────────
// The rate list. Dishes and prices transcribed from the owner's printed menu
// (a photograph). Verify against the current menu before launch.
//
// diet: 'veg' | 'nonveg'. Egg counts as non-veg, as on the printed menu.
// price: number in rupees, or a string such as 'On MRP' for items sold at MRP.
// Names are normalised from the print ("Spl." → "Special", "Lolipop" → "Lollipop").
// ─────────────────────────────────────────────────────────────────────────────

const v = (name, price) => ({ name, price, diet: 'veg' });
const n = (name, price) => ({ name, price, diet: 'nonveg' });

// Momos are a grid: one price per (filling × style).
export const momos = {
  id: 'momos',
  title: 'Momos',
  styles: ['Steam', 'Fried', 'Kurkure', 'Hot Garlic', 'Tandoori'],
  fillings: [
    { name: 'Veg', diet: 'veg', prices: [143, 167, 215, 179, 299] },
    { name: 'Paneer', diet: 'veg', prices: [167, 191, 239, 239, 299] },
    { name: 'Chicken', diet: 'nonveg', prices: [179, 203, 239, 239, 335] },
  ],
};

// Every other board: one or two sections (a section has a diet and a title).
export const boards = [
  {
    id: 'starters',
    title: 'Chinese Starters',
    sections: [
      {
        diet: 'veg',
        title: 'Veg',
        items: [
          v('Chilli Potato', 179),
          v('Honey Chilli Potato', 239),
          v('Chilli Paneer Dry', 349),
          v('Chilli Paneer Gravy', 349),
          v('Chilli Mushroom Dry', 335),
          v('Chilli Mushroom Gravy', 299),
        ],
      },
      {
        diet: 'nonveg',
        title: 'Non-veg',
        items: [
          n('Chilli Chicken Dry', 335),
          n('Chilli Chicken Gravy', 335),
          n('Chicken Lollipop Dry', 359),
          n('Crispy Chicken Wings Fried', 335),
          n('Crispy Chicken Wings Peri Peri Fried', 335),
          n('Special Chicken Salted & Pepper', 419),
        ],
      },
    ],
  },
  {
    id: 'noodles',
    title: 'Noodles',
    sections: [
      {
        diet: 'veg',
        title: 'Veg',
        items: [
          v('Special Veg Noodles', 167),
          v('Paneer Noodles', 203),
          v('Chilli Garlic Noodles', 203),
          v('Hakka Noodles', 203),
          v('Singapuri Noodles', 227),
        ],
      },
      {
        diet: 'nonveg',
        title: 'Non-veg',
        items: [
          n('Egg Noodles', 167),
          n('Chicken Noodles', 203),
          n('Chicken Hakka Noodles', 203),
          n('Chicken Singapuri Noodles', 239),
          n('Chicken + Egg Noodles', 227),
        ],
      },
    ],
  },
  {
    id: 'rice',
    title: 'Fried Rice',
    sections: [
      {
        diet: 'veg',
        title: 'Veg',
        items: [
          v('Veg Fried Rice', 155),
          v('Paneer Fried Rice', 215),
          v('Schezwan Fried Rice', 203),
          v('Chilli Garlic Fried Rice', 215),
        ],
      },
      {
        diet: 'nonveg',
        title: 'Non-veg',
        items: [
          n('Egg Fried Rice', 179),
          n('Chicken Fried Rice', 239),
          n('Schezwan Chicken Fried Rice', 239),
          n('Egg + Chicken Fried Rice', 263),
        ],
      },
    ],
  },
  {
    id: 'manchurian',
    title: 'Manchurian & Rolls',
    stack: true, // two short sections read better stacked in one column
    sections: [
      {
        diet: 'veg',
        title: 'Veg Manchurian',
        items: [
          v('Veg Manchurian Dry', 203),
          v('Veg Manchurian Gravy', 203),
          v('Paneer Manchurian Dry', 299),
          v('Paneer Manchurian Gravy', 299),
          v('Gobhi Manchurian Dry', 311),
        ],
      },
      {
        diet: 'veg',
        title: 'Spring Roll',
        items: [v('Special Veg Spring Roll', 155)],
      },
    ],
  },
  {
    id: 'soups',
    title: 'Soups',
    sections: [
      {
        diet: 'veg',
        title: 'Veg',
        items: [
          v('Veg Soup', 119),
          v('Tomato Soup', 119),
          v('Corn Soup', 119),
          v('Hot & Sour Soup', 119),
          v('Veg Manchow Soup', 155),
          v('Veg Talumein Soup', 155),
          v('Thukpa Soup', 155),
        ],
      },
      {
        diet: 'nonveg',
        title: 'Non-veg',
        items: [
          n('Chicken Talumein Soup', 179),
          n('Chicken Manchow Soup', 179),
          n('Clear Soup', 179),
          n('Special Chicken Soup', 179),
        ],
      },
    ],
  },
  {
    id: 'bites',
    title: 'Quick Bites',
    sections: [
      {
        diet: 'veg',
        title: 'Pasta, Maggi & Sandwich',
        items: [
          v('Red Sauce Pasta', 239),
          v('White Sauce Pasta', 239),
          v('Veg Maggi', 119),
          v('Special Maggi', 179),
          v('Special Loaded Sandwich', 179),
        ],
      },
      {
        diet: 'veg',
        title: 'Child Specials',
        items: [
          v('Salted Fries', 119),
          v('Peri Peri Fries', 179),
          v('Corn Salted & Pepper', 239),
        ],
      },
      {
        diet: 'nonveg',
        title: 'Omelette',
        items: [n('Single Egg Omelette', 143), n('Double Egg Omelette', 186)],
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Shakes & Drinks',
    sections: [
      {
        diet: 'veg',
        title: 'Cold & hot',
        items: [
          v('Oreo Shake', 119),
          v('Lime Soda', 83),
          v('Cold Coffee', 119),
          v('Hot Coffee', 59),
          v('Hot Tea', 47),
          v('Cold Drink', 'On MRP'),
          v('Water', 'On MRP'),
        ],
      },
    ],
  },
];

// Combos, in print order. All vegetarian.
export const combos = [
  {
    id: 'combo-meal',
    price: 239,
    parts: ['Veg Fried Rice or Veg Noodles', 'Veg Manchurian', 'Cold Drink'],
  },
  {
    id: 'combo-momos',
    price: 119,
    parts: ['Veg Momos, 2 pcs', 'Paneer Momos, 2 pcs', 'Cold Drink'],
  },
  {
    id: 'combo-roll',
    price: 179,
    parts: ['Veg Spring Roll, 1', 'Veg Momos, 3 pcs', 'Cold Drink'],
  },
  {
    id: 'combo-cafe',
    price: 239,
    parts: ['Sandwich', 'Cold Coffee'],
  },
];

// ── Derived helpers ──────────────────────────────────────────────────────────

const numeric = (p) => (typeof p === 'number' ? p : Infinity);

/** Lowest numeric price on a board (used for "from ₹" lines). */
export function fromPrice(board) {
  if (board === momos) {
    return Math.min(...momos.fillings.flatMap((f) => f.prices));
  }
  return Math.min(...board.sections.flatMap((s) => s.items.map((i) => numeric(i.price))));
}

/** Rupee formatting with Indian digit grouping. Strings pass through. */
export function rupees(p) {
  return typeof p === 'number' ? `₹${p.toLocaleString('en-IN')}` : String(p);
}

export const byId = Object.fromEntries([momos, ...boards].map((b) => [b.id, b]));

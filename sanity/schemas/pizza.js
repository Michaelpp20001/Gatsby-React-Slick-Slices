import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxlength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      // how to control your data, cant add a pizza less than $10
      validation: (Rule) => Rule.min(1000),
      // TODO: add custom input component
      inputComponent: PriceInput,
    },
    // creating data relations
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    // destructuring, sticking everything we didnt destructure, into an object called toppings
    prepare: ({ title, media, ...toppings }) => {
      // 1. filter undefined toppings out
      const tops = Object.values(toppings).filter(Boolean);
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};

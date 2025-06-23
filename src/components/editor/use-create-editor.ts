'use client';

import { withProps } from '@udecode/cn';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
  BasicMarksPlugin,
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { ListPlugin } from '@udecode/plate-list/react';
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';

export const useCreateEditor = () => {
  return usePlateEditor({
    components: {
      blockquote: withProps(PlateElement, {
        as: 'blockquote',
        className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
      }),
      [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
      [CodePlugin.key]: withProps(PlateLeaf, { 
        as: 'code',
        className: 'rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm whitespace-pre-wrap'
      }),
      h1: withProps(PlateElement, {
        as: 'h1',
        className:
          'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
      }),
      h2: withProps(PlateElement, {
        as: 'h2',
        className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
      }),
      h3: withProps(PlateElement, {
        as: 'h3',
        className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
      }),
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
      [ParagraphPlugin.key]: withProps(PlateElement, {
        as: 'p',
        className: 'mb-4',
      }),
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      ul: withProps(PlateElement, {
        as: 'ul',
        className: 'mb-4 list-disc pl-6',
      }),
      ol: withProps(PlateElement, {
        as: 'ol',
        className: 'mb-4 list-decimal pl-6',
      }),
      li: withProps(PlateElement, {
        as: 'li',
        className: 'mb-1',
      }),
    },
    plugins: [
      BasicElementsPlugin, 
      BasicMarksPlugin, 
      CodePlugin,
      IndentListPlugin,
      ListPlugin,
    ],
    value: [
      {
        children: [{ text: 'Basic Editor' }],
        type: 'h1',
      },
      {
        children: [{ text: 'Heading 2' }],
        type: 'h2',
      },
      {
        children: [{ text: 'Heading 3' }],
        type: 'h3',
      },
      {
        children: [{ text: 'This is a blockquote element' }],
        type: 'blockquote',
      },
      {
        children: [
          { text: 'Basic marks: ' },
          { bold: true, text: 'bold' },
          { text: ', ' },
          { italic: true, text: 'italic' },
          { text: ', ' },
          { text: 'underline', underline: true },
          { text: ', ' },
          { strikethrough: true, text: 'strikethrough' },
          { text: ', ' },
          { code: true, text: 'code' },
          { text: '.' },
        ],
        type: ParagraphPlugin.key,
      },
    ],
  });
};

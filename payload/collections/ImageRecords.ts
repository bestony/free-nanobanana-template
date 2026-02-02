import type { CollectionConfig } from "payload";

export const ImageRecords: CollectionConfig = {
  slug: "image-records",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
    },
  ],
};

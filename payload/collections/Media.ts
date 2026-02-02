import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "users",
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
  },
};

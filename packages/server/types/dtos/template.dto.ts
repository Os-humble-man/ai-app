export type CreateTemplateDto = {
   userId: string;
   name: string;
   prompt: string;
   tags: string[];
   description: string;
};

export type UpdateTemplateDto = {
   name?: string;
   prompt?: string;
   tags?: string[];
   content?: string;
};

export type TemplateDto = {
   id: string;
   userId: string;
   name: string;
   content: string;
   createdAt: Date;
};

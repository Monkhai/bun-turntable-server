import { z } from 'zod';

export type Timeline = {
  delay: number;
  duration: number;
  params: {
    rotate: number;
    easeIn: {
      duration: number;
      level: number;
    };
    easeOut: {
      duration: number;
      level: number;
    };
  };
};

export const timelineSchema = z
  .object({
    delay: z.number(),
    duration: z.number(),
    params: z.object({
      rotate: z.number(),
      easeIn: z.object({
        duration: z.number(),
        level: z.number()
      }),
      easeOut: z.object({
        duration: z.number(),
        level: z.number()
      })
    })
  })
  .refine(
    (data) => {
      const easeInDuration = data.params.easeIn.duration;
      const easeOutDuration = data.params.easeOut.duration;
      const totalEaseDuration = easeInDuration + easeOutDuration;

      return data.duration > totalEaseDuration;
    },
    {
      message: 'Duration must be greater than the sum of easeIn.duration and easeOut.duration',
      path: ['duration'] // This will point the error to the duration field
    }
  );

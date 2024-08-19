import type { InferSelectModel } from 'drizzle-orm';
import type { userTable } from '../database/schema';
import type { Condition } from '../services/auth.service';

export type ValidationSource = 'json' | 'param' | 'query';
export type ValidationDataFuncs<T> = {json? : T; param? : T; query? : T};

declare module 'hono' {
    interface HonoRequest {
        validationData : ValidationDataFuncs<unknown>
    }
}

export type SubscriptionPeriodEnum = 'monthly' | 'yearly';
export type PlanEnum = 'free' | 'premium';

export type SelectUser = InferSelectModel<typeof userTable>;
export type PublicUserInfo = Omit<SelectUser, 'password'>;

export type ActivationLink = {
    activationToken : string; magicLink : string
};
export type ActivationCode = {
    activationToken : string; activationCode : string
};

export type VerifyMagicLinkToken = {
    token : string; c : Condition
}

export type VerifyActivationCodeToken = {
    activationCode : string; user : Pick<SelectUser, 'email' | 'password'>;
}
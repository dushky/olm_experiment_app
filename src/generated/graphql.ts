import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  token: Scalars['String'];
};

export type EmailVerificationResponse = {
  __typename?: 'EmailVerificationResponse';
  status: EmailVerificationStatus;
};

export enum EmailVerificationStatus {
  /** VERIFIED */
  Verified = 'VERIFIED'
}

export type ForgotPasswordInput = {
  email: Scalars['String'];
  reset_password_url?: Maybe<ResetPasswordUrlInput>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message?: Maybe<Scalars['String']>;
  status: ForgotPasswordStatus;
};

export enum ForgotPasswordStatus {
  /** EMAIL_SENT */
  EmailSent = 'EMAIL_SENT'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String'];
  status: LogoutStatus;
};

export enum LogoutStatus {
  /** TOKEN_REVOKED */
  TokenRevoked = 'TOKEN_REVOKED'
}

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: ForgotPasswordResponse;
  login: AccessToken;
  logout: LogoutResponse;
  register: RegisterResponse;
  resendEmailVerification: ResendEmailVerificationResponse;
  resetPassword: ResetPasswordResponse;
  updatePassword: UpdatePasswordResponse;
  updateUser?: Maybe<User>;
  verifyEmail: EmailVerificationResponse;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};


export type MutationResendEmailVerificationArgs = {
  input: ResendEmailVerificationInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  inputUpdate?: Maybe<UpdateUser>;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  status: RegisterStatus;
  token?: Maybe<Scalars['String']>;
};

export enum RegisterStatus {
  /** MUST_VERIFY_EMAIL */
  MustVerifyEmail = 'MUST_VERIFY_EMAIL',
  /** SUCCESS */
  Success = 'SUCCESS'
}

export type ResendEmailVerificationInput = {
  email: Scalars['String'];
};

export type ResendEmailVerificationResponse = {
  __typename?: 'ResendEmailVerificationResponse';
  status: ResendEmailVerificationStatus;
};

export enum ResendEmailVerificationStatus {
  /** EMAIL_SENT */
  EmailSent = 'EMAIL_SENT'
}

export type ResetPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message?: Maybe<Scalars['String']>;
  status: ResetPasswordStatus;
};

export enum ResetPasswordStatus {
  /** PASSWORD_RESET */
  PasswordReset = 'PASSWORD_RESET'
}

/**
 * The url used to reset the password.
 * Use the `__EMAIL__` and `__TOKEN__` placeholders to inject the reset password email and token.
 *
 * e.g; `https://my-front-end.com?reset-password?email=__EMAIL__&token=__TOKEN__`
 */
export type ResetPasswordUrlInput = {
  url: Scalars['String'];
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdatePasswordInput = {
  current_password: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type UpdatePasswordResponse = {
  __typename?: 'UpdatePasswordResponse';
  status: UpdatePasswordStatus;
};

export enum UpdatePasswordStatus {
  /** PASSWORD_UPDATED */
  PasswordUpdated = 'PASSWORD_UPDATED'
}

export type UpdateUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  created_at?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/**
 * The url used to verify the email address.
 * Use __ID__ and __HASH__ to inject values.
 *
 * e.g; `https://my-front-end.com/verify-email?id=__ID__&hash=__HASH__`
 *
 * If the API uses signed email verification urls
 * you must also use __EXPIRES__ and __SIGNATURE__
 *
 * e.g; `https://my-front-end.com/verify-email?id=__ID__&hash=__HASH__&expires=__EXPIRES__&signature=__SIGNATURE__`
 */
export type VerificationUrlInput = {
  url: Scalars['String'];
};

export type VerifyEmailInput = {
  expires?: Maybe<Scalars['Int']>;
  hash: Scalars['String'];
  id: Scalars['ID'];
  signature?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  login?: Maybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', token: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', status: LogoutStatus, message: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined } | null | undefined };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined } | null | undefined };


export const LoginDocument = gql`
    mutation login($login: LoginInput) {
  login(input: $login) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    status
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    name
    email
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
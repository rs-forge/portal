import { createApi  } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export interface Member {
    id: string,
    name: string,
    instruments: Instrument[]
}

export enum Instrument {
    LEAD = 'Lead Guitar',
    RHYTHYM = 'Rhythym Guitar',
    BASS = 'Bass Guitar',
    KEYS = 'Keys',
    VOCALS = 'Vocals',
    BACKING_VOCALS = 'Backing Vocals',
    DRUMS = 'Drums',
    PERCUSSION = 'Percussion',
    SAX = 'Saxophone'
}

export interface Pagination {
    page: number
    per_page: number
    total: number
    total_pages: number
}

export interface MemberResponse {
    data: {
        member: Member
    }
}

export interface GetMembersResponse extends Pagination {
    data: {
        members: Member[]
    }
}

export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: graphqlRequestBaseQuery({ url: 'localhost:4000/graphql' }),
    tagTypes: ['Member'],
    endpoints: (builder) => ({
        getMembers: builder.query<GetMembersResponse, { limit?: number; offset?: number }>({
            query: ({ limit, offset }) => ({
                document: gql`
                    query {
                        findMembers(page: {limit: $limit, offset: $offset}}) {
                            items {
                            name
                            }
                        }
                    }
                `,
                variables: {
                    limit,
                    offset,
                },
            })
        }),
        getMember: builder.query<Member, string>({
            query: (id) => ({
              document: gql`
                query GetMember($id: ID!) {
                    member(id: ${id}) {
                    id
                        name
                        instruments
                    }
                }
              `,
            }),
            transformResponse: (response: MemberResponse) => response.data.member,
            providesTags: (result, error, id) => [{ type: 'Member', id }] //TODO find out what this is
          }),
    })
})

export const { useGetMembersQuery, useGetMemberQuery } = membersApi;
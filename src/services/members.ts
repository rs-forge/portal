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
    baseQuery: graphqlRequestBaseQuery({ url: ' /qraphql' }),
    tagTypes: ['Member'],
    endpoints: (builder) => ({
        getMembers: builder.query<GetMembersResponse, { page?: number; per_page?: number }>({
            query: ({ page, per_page }) => ({
                document: gql`
                    query GetMembers($page: Int = 1, $per_page: Int = 10) {
                        members(page: $page, per_page: $per_page) {
                            id
                            name
                            instruments
                        }
                    }
                `,
                variables: {
                    page,
                    per_page,
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
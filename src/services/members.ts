import { createApi  } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export interface Member {
    _id: string,
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
    limit: number
    offset: number
    count: number
}

export interface MemberResponse {
    member: Member
}

export interface GetMembersResponse extends Pagination {
    members: Member[]
}

export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: graphqlRequestBaseQuery({ url: '/graphql' }),
    tagTypes: ['Member'],
    endpoints: (builder) => ({
        getMembers: builder.query<GetMembersResponse, { limit?: number; offset?: number }>({
            query: ({ limit, offset }) => ({
                document: gql`
                    query FindMembers($limit: Int, $offset: Int) {
                        findMembers(page: {limit: $limit, offset: $offset}) {
                            items {
                                _id
                                name
                                instruments
                            }
                            limit
                            offset
                            count
                        }
                    }
                `,
                variables: {
                    limit,
                    offset,
                },
            }),
            transformResponse: (response: any) => ({ members: response.findMembers.items, limit: response.findMembers.limit, offset: response.findMembers.offset, count: response.findMembers.count }),
            providesTags: (result, error, queryArgs) => result?.members.map(member => ({ type: 'Member', id: member._id })) ?? ['Member']
        }),
        getMember: builder.query<Member, string>({
            query: (id) => ({
              document: gql`
                query GetMember($id: GraphbackObjectID!) {
                    getMember(id: $id) {
                        _id
                        name
                        instruments
                    }
                }
              `,
              variables: { id }
            }),
            transformResponse: (response: any) => response.getMember,
            providesTags: (result, error, queryArgs) => [{ type: 'Member', id: result?._id  ?? queryArgs }]
          }),
    })
})

export const { useGetMembersQuery, useGetMemberQuery } = membersApi;
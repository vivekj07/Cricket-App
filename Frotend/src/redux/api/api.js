import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/`,
    }),
    tagTypes: ["Player","Team","League","Match","Venue","Umpire","ContactUS","FileUpload"],
    endpoints: (builder) => ({

        // User
        signUp:builder.mutation({
            query:(formData)=>({
                url:"user/new",
                credentials:"include",
                method:"POST",
                body:formData
            })
        }),
        logOut:builder.mutation({
            query:()=>({
                url:"user/logout",
                credentials:"include",
                method:"POST",
            })
        }),
        logIn:builder.mutation({
            query:(body)=>({
                url:"user/login",
                credentials:"include",
                method:"POST",
                body
            })
        }),

        //Matches
        getAllMatches: builder.query({
            query: (id) => ({
                url: `match/all`,
                credentials: "include"
            }),
            providesTags:["Match"]
        }),
        getAllMatchesOfLeague: builder.query({
            query: (id) => ({
                url: `match/allLeague/${id}`,
                credentials: "include"
            }),
        }),
        getMatchDetails: builder.query({
            query: (id) => ({
                url: `match/${id}`,
                credentials: "include"
            }),
            providesTags:["Match"]
        }),
        newMatch:builder.mutation({
            query:(body)=>({
                url:"match/new",
                credentials:"include",
                method:"POST",
                body
            }),
            invalidatesTags:["Match"]
        }),
        deleteMatch:builder.mutation({
            query:(id)=>({
                url:`match/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Match"]
        }),
        updateMatch:builder.mutation({
            query:({id,body})=>({
                url:`match/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updateMatchResult:builder.mutation({
            query:({id,body})=>({
                url:`match/result/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updatePlayerStats:builder.mutation({
            query:(body)=>({
                url:`match/playerStats`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match","Player"]
        }),


        // Player
        getAllPlayers: builder.query({
            query: () => ({
                url: `player/all`,
                credentials: "include"
            }),
            providesTags:["Player"]
        }),
        getPlayerDetails: builder.query({
            query: (id) => ({
                url: `player/${id}`,
                credentials: "include"
            }),
            providesTags:["Player"]
        }),
        newPlayer:builder.mutation({
            query:(formData)=>({
                url:"player/new",
                credentials:"include",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Player"]
        }),
        deletePlayer:builder.mutation({
            query:(id)=>({
                url:`player/delete/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Player"]
        }),
        updatePlayer:builder.mutation({
            query:({id,formData})=>({
                url:`player/update/${id}`,
                credentials:"include",
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Player"]
        }),
        updatePlayerPerformance:builder.mutation({
            query:({id,body})=>({
                url:`player/update/performance/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Player"]
        }),


        // Team
        getAllTeams: builder.query({
            query: () => ({
                url: `teams/all`,
                credentials: "include"
            }),
            providesTags:["Team"]
        }),
        getTeamDetails: builder.query({
            query: (id) => ({
                url: `teams/${id}`,
                credentials: "include"
            }),
            providesTags:["Team"]
        }),
        newTeam:builder.mutation({
            query:(formData)=>({
                url:"teams/new",
                credentials:"include",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Team"]
        }),
        updateTeam:builder.mutation({
            query:({id,formData})=>({
                url:`teams/update/${id}`,
                credentials:"include",
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Team"]
        }),
        deleteTeam:builder.mutation({
            query:(id)=>({
                url:`teams/delete/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Team","Player"]
        }),
        addPlayers:builder.mutation({
            query:({id,playerIds})=>({
                url:`teams/players/update/${id}`,
                credentials:"include",
                method:"PUT",
                body:{playerIds}
            }),
            invalidatesTags:["Team","Player"]
        }),
        removePlayer:builder.mutation({
            query:({id,playerId,action="remove"})=>({
                url:`teams/player/update/${id}`,
                credentials:"include",
                method:"PUT",
                body:{playerId,action}
            }),
            invalidatesTags:["Team","Player"]
        }),
        makeCaptain:builder.mutation({
            query:({id,playerId})=>({
                url:`teams/update/captain/${id}`,
                credentials:"include",
                method:"PUT",
                body:{playerId}
            }),
            invalidatesTags:["Team"]
        }),
        updateTeamPerformance:builder.mutation({
            query:({id,body})=>({
                url:`teams/update/performance/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Team"]
        }),

        // Leagues
        getLeagueDetails: builder.query({
            query: (id) => ({
                url: `leagues/${id}`,
                credentials: "include"
            }),
            providesTags:["League"]
        }),
        getAllLeagues: builder.query({
            query: () => ({
                url: `leagues/all`,
                credentials: "include"
            }),
            providesTags:["League"]
        }),
        newLeague:builder.mutation({
            query:(body)=>({
                url:"leagues/new",
                credentials:"include",
                method:"POST",
                body
            }),
            invalidatesTags:["League"]
        }),
        updateLeague:builder.mutation({
            query:({id,body})=>({
                url:`leagues/update/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["League"]
        }),
        deleteleague:builder.mutation({
            query:(id)=>({
                url:`leagues/delete/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["League"]
        }),
        addTeams:builder.mutation({
            query:({id,teams})=>({
                url:`leagues/update/addteams/${id}`,
                credentials:"include",
                method:"PUT",
                body:{teams}
            }),
            invalidatesTags:["League"]
        }),
        removeTeam:builder.mutation({
            query:({id,team})=>({
                url:`leagues/update/removeteam/${id}`,
                credentials:"include",
                method:"PUT",
                body:{team}
            }),
            invalidatesTags:["League"]
        }),

        // Venue
        getVenue: builder.query({
            query: (id) => ({
                url: `venue/${id}`,
                credentials: "include"
            }),
            providesTags:["Venue"]
        }),
        getAllVenues: builder.query({
            query: () => ({
                url: `venue/all`,
                credentials: "include"
            }),
            providesTags:["Venue"]
        }),
        newVenue:builder.mutation({
            query:(body)=>({
                url:"venue/new",
                credentials:"include",
                method:"POST",
                body
            }),
            invalidatesTags:["Venue"]
        }),
        updateVenue:builder.mutation({
            query:({id,body})=>({
                url:`venue/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Venue"]
        }),
        deleteVenue:builder.mutation({
            query:(id)=>({
                url:`venue/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Venue"]
        }),

        // Umpire
        getUmpire: builder.query({
            query: (id) => ({
                url: `umpire/${id}`,
                credentials: "include"
            }),
            providesTags:["Umpire"]
        }),
        getAllUmpires: builder.query({
            query: () => ({
                url: `umpire/all`,
                credentials: "include"
            }),
            providesTags:["Umpire"]
        }),
        newUmpire:builder.mutation({
            query:(formData)=>({
                url:"umpire/new",
                credentials:"include",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Umpire"]
        }),
        updateUmpire:builder.mutation({
            query:({id,formData})=>({
                url:`umpire/${id}`,
                credentials:"include",
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Umpire"]
        }),
        deleteUmpire:builder.mutation({
            query:(id)=>({
                url:`umpire/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Umpire"]
        }),

        // ScoreBoard
        generateScoreBoard:builder.mutation({
            query:(body)=>({
                url:`scoreBoard/new`,
                credentials:"include",
                method:"POST",
                body
            }),
            invalidatesTags:["Match"]
        }),
        deleteScoreBoard:builder.mutation({
            query:(id)=>({
                url:`scoreBoard/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["Match"]
        }),
        updateMOM:builder.mutation({
            query:({id,body})=>({
                url:`scoreBoard/mom/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updateTeamScore:builder.mutation({
            query:({id,body})=>({
                url:`scoreBoard/teamScore/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updateBatsManStat:builder.mutation({
            query:({id,body})=>({
                url:`scoreBoard/batsManStat/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updateBowlerStat:builder.mutation({
            query:({id,body})=>({
                url:`scoreBoard/bowlerStat/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),
        updateExtras:builder.mutation({
            query:({id,body})=>({
                url:`scoreBoard/extras/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["Match"]
        }),

        // PointsTable
        updatePointsTable:builder.mutation({
            query:({id,body})=>({
                url:`pointstable/update/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["League"]
        }),
        updatePointsTableDirectly:builder.mutation({
            query:({id,body})=>({
                url:`pointstable/update/direct/${id}`,
                credentials:"include",
                method:"PUT",
                body
            }),
            invalidatesTags:["League"]
        }),

        // Contact US
        getAllContactUS: builder.query({
            query: () => ({
                url: `contactUS/all`,
                credentials: "include"
            }),
            providesTags:["ContactUS"]
        }),
        newContactUS:builder.mutation({
            query:(body)=>({
                url:`contactUS/new`,
                credentials:"include",
                method:"POST",
                body
            }),
        }),
        deleteContactUSData:builder.mutation({
            query:(id)=>({
                url:`contactUS/${id}`,
                credentials:"include",
                method:"DELETE",
            }),
            invalidatesTags:["ContactUS"]
        }),

        // FilesUpload
        getAllFiles: builder.query({
            query: () => ({
                url: `fileupload/all`,
                credentials: "include"
            }),
            providesTags:["FileUpload"]
        }),
        newFilesUpload:builder.mutation({
            query:(formData)=>({
                url:`fileupload/new`,
                credentials:"include",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["FileUpload"]
        }),
        deleteFile:builder.mutation({
            query:({publicId})=>({
                url:`fileupload/delete`,
                credentials:"include",
                method:"DELETE",
                body:{publicId}
            }),
            invalidatesTags:["FileUpload"]
        }),

    })
})
export default api
export const {
    useGetAllMatchesQuery,useGetAllMatchesOfLeagueQuery,useGetMatchDetailsQuery, 
    useGetAllPlayersQuery, useGetPlayerDetailsQuery, 
    useGetAllTeamsQuery, useGetTeamDetailsQuery, 
    useGetAllLeaguesQuery, useGetLeagueDetailsQuery,
    useGetAllVenuesQuery, useGetVenueQuery,
    useGetAllUmpiresQuery, useGetUmpireQuery,
    useGetAllContactUSQuery,
    useGetAllFilesQuery,

    useNewMatchMutation, useDeleteMatchMutation, useUpdateMatchMutation, useUpdateMatchResultMutation,
    useUpdatePlayerStatsMutation,
    useSignUpMutation,useLogOutMutation,useLogInMutation, 
    useNewPlayerMutation, useDeletePlayerMutation, useUpdatePlayerMutation, useUpdatePlayerPerformanceMutation,
    useNewTeamMutation, useUpdateTeamMutation, useDeleteTeamMutation, useAddPlayersMutation, 
    useRemovePlayerMutation, useMakeCaptainMutation, useUpdateTeamPerformanceMutation,
    useNewLeagueMutation, useUpdateLeagueMutation, useDeleteleagueMutation, useAddTeamsMutation, useRemoveTeamMutation,
    useNewVenueMutation,useUpdateVenueMutation,useDeleteVenueMutation,
    useDeleteUmpireMutation, useNewUmpireMutation, useUpdateUmpireMutation,
    useGenerateScoreBoardMutation, useDeleteScoreBoardMutation, useUpdateMOMMutation, useUpdateTeamScoreMutation,
    useUpdateBatsManStatMutation, useUpdateBowlerStatMutation, useUpdateExtrasMutation,
    useUpdatePointsTableMutation, useUpdatePointsTableDirectlyMutation,
    useNewContactUSMutation, useDeleteContactUSDataMutation,
    useNewFilesUploadMutation, useDeleteFileMutation,
} = api
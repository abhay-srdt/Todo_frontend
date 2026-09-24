export const todoKeys={
    all: (userId) => ["todos",userId],
    byDate:(userId,date)=>["todos",userId,"byDate",date],
}
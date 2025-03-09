// d > definitions file to define types > no need to export, available globally

import { ZodIssue } from "zod";
// discriminated union type
type ActionResult <T> =  // T is a generic type, it can be anything (a user, an array of users/messages etc)
// whatever the type of T is, it can be either success or error, 
// if success, it will return the data, if error, we'll return an error as string or arrays of Zod issues
{ status: "success", data: T } | { status: "error", error: string | ZodIssue[] }
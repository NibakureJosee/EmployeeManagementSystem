// make owners component

import Books from "../models/book.model.js"
import { createSuccessResponse, errorResponse, serverErrorResponse, successResponse } from "../utils/api.response.js";
import _ from "lodash";


//the student logic
export const createBook= async (req, res) => {
    try {

        let book = new Books( 
            _.pick(req.body, [
                "name",
                "author",
                "publisher",
                "publicationYear",
                "subject"
            ])
        );
        try {
            await book.save();
            return createSuccessResponse("Book registered successfully", {}, res);
        } catch (ex) {
            return errorResponse(ex.message, res);
        }
        
    } catch (ex) {
        console.log(ex)
        return serverErrorResponse(ex, res);
    }
}


// Function to get paginated list of books
export const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const { count, rows } = await Books.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);
        const returnObject = {
            data: rows,
            currentPage: page,
            totalPages,
            totalData: count,
        };

        return successResponse("Books", returnObject, res);
    } catch (ex) {
        console.log(ex);
        return serverErrorResponse(ex, res);
    }
}

export const getAllBooks = async (req, res) => {
    try {
        let books= await Books.findAll();
        return successResponse("Books fetched successfully", books, res);
    } catch (ex) {
        console.log(ex);
        return serverErrorResponse(ex, res);
    }
}


// export const bookStudent = async (req, res) => {
//     try {
//         const student = await Books.findByPk(req.params.id);
        
//         // Check if student is found
//         if (!student) {
//             return errorResponse("Student not found", res);
//         }

//         // Delete the student record
//         await student.destroy();

//         // Return success response
//         return successResponse("Student deleted successfully", {}, res);
//     } catch (ex) {
//         // Handle any exceptions
//         console.log(ex);
//         return serverErrorResponse(ex, res);
//     }
// };
// //add a logic to update our student

// export const updateStudent = async (req, res) => {
//         try{
//             const student = await Students.findByPk(req.params.id);
//             if (!student) {
//                 return errorResponse("Student not found", res);
//             }
//             console.log(req.body);
//          await student.update(
//             _.pick(req.body, [
//                 "firstname",
//                 "lastname",
//                 "phone",
//                 "address"
//             ])
//         );
//         return successResponse("Student updated successfully", {}, res);
//     }
//     catch (ex) {
//         console.log(ex);
//         return serverErrorResponse(ex, res);
//     }
// }


// //add search logic and functionality

// export const searchStudent = async (req, res) => {
//     try{

//         const {search} = req.query;
//         const students = await Students.findAll({
//             where: {
//                 [Op.or]: [
//                     {
//                         firstname: {
//                             [Op.like]: `%${search}%`
//                         }
//                     },
//                     {
//                         lastname: {
//                             [Op.like]: `%${search}%`
//                         }
//                     },
//                     {
//                         email: {
//                             [Op.like]: `%${search}%`
//                         }
//                     },
//                     {
//                         phone: {
//                             [Op.like]: `%${search}%`
//                         }
//                     },
//                     {
//                         address: {
//                             [Op.like]: `%${search}%`
//                         }
//                     }
//                 ]
//             }
//         });
//         return successResponse("Students fetched successfully", students, res);
//     } catch(ex){
//         console.log(ex);
//         return serverErrorResponse(ex, res);    
//     }

// }
















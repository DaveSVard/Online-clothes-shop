import * as Yup from "yup";

export const singUpSchema = Yup.object().shape({
    name: Yup.string().required("Fill in the field!"),
    username: Yup.string().required("Fill in the field!"),
    email: Yup.string().required("Fill in the field!"),
    password: Yup.string().required("Fill in the field!"),
    phone_number: Yup.string().required("Fill in the field!"),
});

export const singInSchema = Yup.object().shape({
    username: Yup.string().required("Enter username!"),
    password: Yup.string().required("Enter password!"),
});

export const addBrandSchema = Yup.object().shape({
    name: Yup.string().required("Enter brand name!"),
});

export const addCategorySchema = Yup.object().shape({
    name: Yup.string().required("Enter category name!"),
});

export const addProductSchema = Yup.object().shape({
    name: Yup.string().required("Enter product name!"),
    price: Yup.number().required("Enter product price!").positive("Price must be positive!").integer("Use only numbers!"),
    description: Yup.string().required("Enter product description"),
    brand: Yup.string().required("Select brand!"),
    category: Yup.string().required("Select category!"),
    sizes: Yup.array().of(
        Yup.object().shape({
            size: Yup.string().required("Enter product size!"),
            count: Yup.number().required("Enter product count!").positive("Count must be positive!").integer("Use only numbers!")
        }).required("Required")
    ),
})

export const updateProductSchema = Yup.object().shape({
    name: Yup.string().required("Enter new name!"),
    price: Yup.number().required("Enter new price!").positive("Price must be positive!").integer("Use only numbers!"),
    description: Yup.string().required("Enter new description"),
    brand: Yup.string().required("Select brand!"),
    category: Yup.string().required("Select category!"),
    sizes: Yup.array().of(
        Yup.object().shape({
            size: Yup.string().required("Enter product size!"),
            count: Yup.number().required("Enter product count!").positive("Count must be positive!").integer("Use only numbers!")
        }).required("Required")
    ),
})

export const changeNameSchema = Yup.object().shape({
    name: Yup.string().required("Enter new name!"),
});

export const sizeProductSchema =  Yup.object().shape({
    sizes: Yup.object().shape({
        size: Yup.string().required("Enter product size!"),
        count: Yup.string().required("Enter product count!")
    }).required("Required")
});

export const sendEmailSchema = Yup.object().shape({
    email: Yup.string().required("Fill in the field!")
})

export const forgotPasswordSchema = Yup.object().shape({
    code: Yup.string().required("Fill in the field!"),
    password: Yup.string().required("Fill in the field!"),
    confirm_password: Yup.string().required("Fill in the field!"),
})

export const changeUserDataSchema = Yup.object().shape({
    name: Yup.string().required("Enter new name!"),
    username: Yup.string().required("Enter new username!")
})

export const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Enter old password!"),
    password: Yup.string().required("Enter new password!"),
    confirmationPassword: Yup.string().required("Repeat new password!"),
})

export const updatePictureSchema = Yup.object().shape({
    file: Yup.string().required("Pick your file!")
})

export const toCartSchema = Yup.object().shape({
    sizeId: Yup.string().required("Choose product size!"),
})
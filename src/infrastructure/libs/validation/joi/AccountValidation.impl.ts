import { AccountEntity } from "@/core/domain/account/entity/Account.entity";
import { AccountValidationGateway } from "@/core/domain/account/gateway/AccountValidation.gateway";
import { ErrorMessages } from "@/core/shared/constants/ErrorMessages.constant";
import { ErrorFieldsValidation } from "@/core/shared/model/ErrorFieldsValidation.model";
import joi from "joi";

export class AccountValidationImpl implements AccountValidationGateway {
  isCreateAccountDataValid(data: AccountEntity): ErrorFieldsValidation {
    const schema: joi.Schema = joi.object({
      name: joi
        .string()
        .min(3)
        .max(255)
        .required()
        .messages({
          "string.min": ErrorMessages.MIN_LENGTH_NOT_MET("name", 3),
          "string.max": ErrorMessages.MAX_LENGTH_EXCEEDED("name", 255),
          "any.required": ErrorMessages.REQUIRED_FIELD("name"),
          "string.empty": ErrorMessages.REQUIRED_FIELD("name"),
        }),
      email: joi
        .string()
        .email()
        .max(255)
        .required()
        .messages({
          "string.email": ErrorMessages.INVALID_FORMAT_FIELD("email"),
          "string.max": ErrorMessages.MAX_LENGTH_EXCEEDED("email", 255),
          "any.required": ErrorMessages.REQUIRED_FIELD("email"),
          "string.empty": ErrorMessages.REQUIRED_FIELD("email"),
        }),
      password: joi
        .string()
        .min(5)
        .required()
        .messages({
          "string.min": ErrorMessages.MIN_LENGTH_NOT_MET("password", 5),
          "any.required": ErrorMessages.REQUIRED_FIELD("password"),
          "string.empty": ErrorMessages.REQUIRED_FIELD("password"),
        }),
    });

    const errorValidation = ErrorFieldsValidation.create();
    const { error } = schema.validate(data.toJSON(), {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        const field = detail.path.join(".") as string;
        const message = detail.message;
        errorValidation.add({ field, message });
      });
    }

    return errorValidation;
  }
}

const ERROR_API_SCHEMA = {
	properties: {
		statusCode: {
			type: 'number'
		},
		message: {
			type: 'string'
		},
		error: {
			type: 'string'
		}
	}
}

export const BAD_REQUEST_API_RESPONSE = {
	status: 400,
	description: 'Má requisição',
	schema: ERROR_API_SCHEMA
}

export const UNAUTHORIZED_API_RESPONSE = {
	status: 401,
	description: 'Não autorizado',
	schema: ERROR_API_SCHEMA
}

export const INTERNAL_SERVER_ERROR_API_RESPONSE = {
	status: 500,
	description: 'Erro interno do servidor',
	schema: ERROR_API_SCHEMA
}

export const FORBIDDEN_API_RESPONSE = {
	status: 403,
	description: 'Requisição proibida',
	schema: ERROR_API_SCHEMA
}

export const NOT_FOUND_API_RESPONSE = {
	status: 404,
	description: 'Não encontrado',
	schema: ERROR_API_SCHEMA
}

export const EMPTY_SCHEMA_API_RESPONSE = {
	properties: {}
}

export const OK_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const EMAIL_PARAM = {
	name: 'email',
	required: true,
	description: 'Email do usuário',
	type: 'string'
}

export const CREATE_USER_API_RESPONSE = {
	status: 201,
	description: 'Usuario criado com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const UPDATE_USER_API_RESPONSE = {
	status: 200,
	description: 'Usuario atualizado com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const DELETE_USER_API_RESPONSE = {
	status: 200,
	description: 'Usuario deletado com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const USER_ID_PARAM = {
	name: 'id',
	required: true,
	description: 'Id do usuário',
	type: 'string'
}

export const GET_USER_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			email: {
				type: 'string'
			},
			credits: {
				type: 'number'
			},
			createdAt: {
				type: 'string'
			},
			updatedAt: {
				type: 'string'
			}
		}
	}
}

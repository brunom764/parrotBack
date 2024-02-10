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

export const MONTHLY_BONUS_API_RESPONSE = {
	status: 200,
	description: 'Execute the cron job to add the monthly bonus'
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
			tier: {
				type: 'string'
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			},
			updatedAt: {
				type: 'string',
				format: 'date-time'
			}
		}
	}
}

export const UPDATE_ANSWER_API_RESPONSE = {
	status: 200,
	description: 'Resposta atualizada com sucesso',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			transId: {
				type: 'string'
			},
			question: {
				type: 'string'
			},
			answer: {
				type: 'string'
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			}
		}
	}
}

export const DELETE_QUESTION_API_RESPONSE = {
	status: 200,
	description: 'Questão deletada com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const QUESTION_ID_PARAM = {
	name: 'id',
	required: true,
	description: 'Id da questão',
	type: 'string'
}

export const TRANS_ID_PARAM = {
	name: 'id',
	required: true,
	description: 'Id da transcrição',
	type: 'string'
}

export const CREATE_QUESTION_API_RESPONSE = {
	status: 201,
	description: 'Questão criada com sucesso',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			transId: {
				type: 'string'
			},
			question: {
				type: 'string'
			},
			answer: {
				type: 'string'
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			}
		}
	}
}

export const GET_QUESTION_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			transId: {
				type: 'string'
			},
			question: {
				type: 'string'
			},
			answer: {
				type: 'string'
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			}
		}
	}
}

export const GET_QUESTIONS_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string'
				},
				createdAt: {
					type: 'string',
					format: 'date-time'
				},
				question: {
					type: 'string'
				},
				answer: {
					type: 'string'
				}
			}
		}
	}
}

export const DELETE_SUMMARY_API_RESPONSE = {
	status: 200,
	description: 'Resumo deletado com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const CREATE_SUMMARY_DTO_API_RESPONSE = {
	status: 201,
	description: 'Resumo criado com sucesso',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			name: {
				type: 'string'
			},
			summary: {
				type: 'string'
			}
		}
	}
}

export const GET_SUMMARY_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			name: {
				type: 'string'
			},
			summary: {
				type: 'string'
			}
		}
	}
}

export const CREATE_TRANSCRIPTION_API_RESPONSE = {
	status: 201,
	description: 'Transcrição criada com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const DELETE_TRANSCRIPTION_API_RESPONSE = {
	status: 200,
	description: 'Transcrição deletada com sucesso',
	schema: EMPTY_SCHEMA_API_RESPONSE
}

export const GET_TRANSCRIPTIONS_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string'
				},
				name: {
					type: 'string'
				},
				duration: {
					type: 'number'
				},
				createdAt: {
					type: 'string',
					format: 'date-time'
				}
			}
		}
	}
}

export const GET_TRANSCRIPTION_API_RESPONSE = {
	status: 200,
	description: 'Ok',
	schema: {
		properties: {
			id: {
				type: 'string'
			},
			userId: {
				type: 'string'
			},
			name: {
				type: 'string'
			},
			text: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						confidence: {
							type: 'number'
						},
						end: {
							type: 'number'
						},
						speaker: {
							type: 'string'
						},
						start: {
							type: 'number'
						},
						text: {
							type: 'string'
						}
					}
				}
			},
			duration: {
				type: 'number'
			},
			createdAt: {
				type: 'string',
				format: 'date-time'
			}
		}
	}
}

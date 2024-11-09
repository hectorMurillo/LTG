const Cliente = require("../models/clientes");
const Clientes = require("../models/clientes");


exports.agregar = (req,res)=>{
		if (!req.body) {
				res.status(400).send(
						{message: "Los datos no pueden venir vacíos"}
				);
		}
		const clientes = new Clientes({
			idSucursal: 1,
			idUsuario: 1,
			email: req.body.email,
			nombre: req.body.nombre,
			apellidoP: req.body.apellidoP,
			apellidoS: req.body.apellidoS,
			rfc: req.body.rfc,
			estado: req.body.estado,
			ciudad: req.body.ciudad,
			colonia: req.body.colonia,
			calle: req.body.calle,
			numExterior: req.body.numExterior,
			numInterior: req.body.numInterior,
			codigoPostal: req.body.codigoPostal,
			celular: req.body.celular,
			fechaNacimiento: req.body.fechaNacimiento
		});
		Clientes.create(clientes, ( err, data )=>{
				if (err)
						res.status(500).send({
								message:
								err.message || "Some error occurred while creating the Cliente."
						});
				else res.send(data);
		});
};

exports.agregarProspecto = (req,res)=>{
	if (!req.body) {
			res.status(400).send(
					{message: "Los datos no pueden venir vacíos"}
			);
	}

	const clientes = new Clientes({
		idSucursal: req.body.idSucursal,
		idUsuario: req.body.idUsuario,
		email: req.body.email,
		nombre: req.body.nombre,
		apellidoP: req.body.apellidoP,
		apellidoS: req.body.apellidoS,
		celular: req.body.celular,
	});

	Clientes.create(clientes, ( err, data )=>{
			if (err)
					res.status(500).send({
							message:
							err.message || "Some error occurred while creating the Cliente."
					});
			else res.send(data);
	});
};

exports.listar = (req,res)=>{
		Clientes.getAll((err,data)=>{
				if(err)
						res.status(500).send({
								message:
										err.message || "Some error ocurred while retrivieving Clientes."
						});
				else res.send(data);
		});
}

// exports.obtenerImagen = (req,res)=>{
// 		Clientes.getImagen((err,data)=>{
// 				const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
// 				const imagen = req.params.imagen;
// 				const extension = path.extname(imagen).slice(1); // Obtener extensión sin punto
		
// 				if (allowedExtensions.includes(extension)) {
// 						res.sendFile(path.join(imagesPath, imagen));
// 				} else {
// 						res.status(404).send('Imagen no encontrada');
// 				}
// 		})
// }

exports.listarByNombre=(req,res) => {
	var nombre = req.body.nombre;
	var pApellido = req.body.pApellido;
	var sApellido = req.body.sApellido;

		Clientes.findNombre(nombre,pApellido,sApellido,(err,data)=>{
				if (err) {
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found Cliente`
							});
						} else {
							res.status(500).send({
								message: `Error retrieving Cliente`
							});
						}
					} else res.send(data);

		});
}

exports.listarCliente=(req,res) => {
	var nombre = req.body.nombre;

		Clientes.findCliente(nombre,(err,data)=>{
				if (err) {
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found Cliente`
							});
						} else {
							res.status(500).send({
								message: `Error retrieving Cliente`
							});
						}
					} else res.send(data);

		});
}
exports.listarById = (req,res)=> {
		var id = req.params.clienteId;
		Clientes.findById(id,(err,data)=>{
				if (err) {
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found Cliente with id ${id}.`
							});
						} else {
							res.status(500).send({
								message: `Error retrieving Cliente with id ${id}`
							});
						}
					} else res.send(data);

		});
};

exports.actualizar = (req,res)=>{
		if (!req.body) {
				res.status(400).send(
						{message: "Los datos no pueden venir vacíos"}
				);
		}
		var id = req.params.clienteId;
		

		const clientes = new Clientes({
			idSucursal: req.body.idSucursal,
			idUsuario: req.body.idUsuario,
			email: req.body.email,
			nombre: req.body.nombre,
			apellidoP: req.body.apellidoP,
			apellidoS: req.body.apellidoS,
			rfc: req.body.rfc,
			estado: req.body.estado,
			ciudad: req.body.ciudad,
			colonia: req.body.colonia,
			calle: req.body.colonia,
			numExterior: req.body.numExterior,
			numInterior: req.body.numInterior,
			codigoPostal: req.body.codigoPostal,
			celular: req.body.celular,
			fechaNacimiento: req.body.fechaNacimiento
		});
		Clientes.updateById(id,clientes,(err,data)=>{
				if (err) { 
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found Cliente with id ${id}.`
							});
						} else {
							res.status(500).send({
								message: `Not found Cliente with id ${id}.`
							});
						}
					} else res.send(data);
		});
};

exports.baja = (req,res)=>{
		var id = req.params.clienteId;
		Clientes.remove(id,(err,data)=>{
				if (err) {
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found cliente with id ${req.params.customerId}.`
							});
						} else {
							res.status(500).send({
								message: "Could not cliente Customer with id " + req.params.customerId
							});
						}
					} else res.send({ message: `Customer was cliente successfully!` });
		});
};
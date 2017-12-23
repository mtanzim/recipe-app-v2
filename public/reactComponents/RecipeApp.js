/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/

class RecipeApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			numRecipes:2,
			newRecipeName: '',
			newIng: {id:0, title:'', qty:0, unit:''},
			editing:false,
			//addRecipeStyleState: {display:'none'}
		};

		this.eachRecipe = this.eachRecipe.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.delAllIngredient = this.delAllIngredient.bind(this);
		this.delIngredient = this.delIngredient.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.remRecipe = this.remRecipe.bind(this);
		this.removeAll = this.removeAll.bind(this);
		this.handleAddRecipe = this.handleAddRecipe.bind(this);
		this.handleAddIngTitle = this.handleAddIngTitle.bind(this);
		this.handleAddIngQty = this.handleAddIngQty.bind(this);
		this.handleAddIngUnit = this.handleAddIngUnit.bind(this);
		this.editRecipName = this.editRecipName.bind(this);
		this.toggleAddRecipe = this.toggleAddRecipe.bind(this);
		this.editIngredient = this.editIngredient.bind(this);
		//this.renderAddRecipeForm = this.renderAddRecipeForm.bind(this);


	}
	toggleAddRecipe() {
		this.setState({
			editing:!this.state.editing
		});
	}
	editRecipName(id,newName) {
		console.log(newName+ ' for '+id);
		var recipeUpdated = this.state.recipes.map(
			recipe => (recipe.id !== id) ?
				recipe :
				{...recipe,
					title:newName} 
		);
		this.setState({
			recipes:recipeUpdated
		});

		//console.log(this.state.recipes)
	}

	addRecipe() {
		var updatedRecipe = this.state.recipes.concat([{id:(new Date).getTime(), title:this.state.newRecipeName, ing:[{}]}])
		this.setState({
			recipes:updatedRecipe,
			numRecipes: this.state.numRecipes+1,
			newRecipeName: ''
		});
		this.toggleAddRecipe();
	}

	handleAddIngTitle (event){
		this.setState({
	 		newIng:{...this.state.newIng,title:event.target.value}
		});
	}
	handleAddIngQty (event){
		this.setState({
	 		newIng:{...this.state.newIng,qty:event.target.value}
		});
	}
	handleAddIngUnit (event){
		this.setState({
	 		newIng:{...this.state.newIng,unit:event.target.value}
		});
	}

	handleAddRecipe (event) {
		this.setState({
	 		newRecipeName:event.target.value
		});
	}

	remRecipe(id) {
		var indexToDel=-1;
		this.state.recipes.forEach(function(recipe, index){
			if (recipe.id===id){
				indexToDel=index;
			}
		});

		console.log(`index to del is ${indexToDel}`);

		var recipeUpdated = this.state.recipes;
		this.state.recipes.splice(indexToDel,1);
		
		this.setState({
			recipes:recipeUpdated
		});

		console.log(recipeUpdated);
	}

	removeAll(){
		this.setState({
			recipes:[],
			numRecipes:0
		});
	} 

	addIngredient(id) {
		//var newIng = [{id:(new Date).getTime(), name: this.state.newIng.title, qty: 2, unit: 'ml'}];
		var newIng = {...this.state.newIng,id:(new Date).getTime()}
		console.log();
		var recipeUpdated = this.state.recipes.map(function(recipe){
			if (recipe.id===id){
				var addedIng=recipe.ing.concat(newIng);
				return {...recipe,ing:addedIng};
			} else {
				return recipe;
			}
		});

		this.setState({
			recipes:recipeUpdated,
			newIng: {id:0, title:'', qty:0, unit:''}
		});

		console.log(recipeUpdated);
	}

	delIngredient(id, ingId) {
		var recIndexToDel=-1;
		var ingIndexToDel=-1;
		this.state.recipes.forEach(function(recipe, index){
			if (recipe.id===id){
				recIndexToDel=index;
				recipe.ing.forEach(function(ing,ingIndex){
					if (ing.id===ingId){
						ingIndexToDel=ingIndex;
					}
				});
			}
		});

		var recipeUpdated = this.state.recipes;
		recipeUpdated[recIndexToDel].ing.splice(ingIndexToDel,1);
		this.setState({
			recipes:recipeUpdated
		});

	}
	editIngredient(id, ingId, editedIng) {
		var recIndexToEdit=-1;
		var ingIndexToEdit=-1;
		this.state.recipes.forEach(function(recipe, index){
			if (recipe.id===id){
				recIndexToEdit=index;
				recipe.ing.forEach(function(ing,ingIndex){
					if (ing.id===ingId){
						ingIndexToEdit=ingIndex;
					}
				});
			}
		});

		var recipeUpdated = this.state.recipes;
		recipeUpdated[recIndexToEdit].ing[ingIndexToEdit]=editedIng;
		console.log(recipeUpdated);	
		this.setState({
			recipes:recipeUpdated
		});

	}

	delAllIngredient(id) {
		var recipeUpdated = this.state.recipes.map(function(recipe){
			if (recipe.id===id){
				var emptyArr=[];
				return {...recipe,ing:emptyArr};
			} else {
				return recipe;
			}
		});

		this.setState({
			recipes:recipeUpdated
		});

		console.log(recipeUpdated);


	}

	eachRecipe(recipe){
		return (
			<RecipeCard
				key={recipe.id}
				id={recipe.id}
				title={recipe.title}
				ingredients={recipe.ing}
				addIng={this.addIngredient}
				remRecipe={this.remRecipe}
				delAllIng={this.delAllIngredient}
				delIng={this.delIngredient}
				editIngredient={this.editIngredient}
				handleIngTitle={this.handleAddIngTitle}
				handleIngQty={this.handleAddIngQty}
				handleIngUnit={this.handleAddIngUnit}
				saveEdit = {this.editRecipName}
			></RecipeCard>
		);
	}

	render () {
		return (
			<div className="container">
				<h1 className="mt-4">Recipe List</h1>
				<button type="button" className="mt-2 btn btn-default" onClick={this.toggleAddRecipe}><i className="fa fa-plus" aria-hidden="true"></i></button>
				<button className="mt-2 ml-2 btn btn-danger" onClick={this.removeAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
				{this.state.editing && (<div className="mt-4">
					<AddRecipeForm onChange={this.handleAddRecipe} onSaveButton={this.addRecipe}/>
				</div>)}
				<div className="row">
					{this.state.recipes.map(this.eachRecipe)}
				</div>
			</div>
		)
	}
}



class RecipeCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingName:false,
			AddingIng:false,
			editedRecipeName:'',
			editedIng:this.props.ingredients
			//editRecipeStyleState: {display:'none'},
			//addIngStyleState: {display:'none'}
		};

		this.eachIng = this.eachIng.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeRecipe = this.removeRecipe.bind(this);
		this.delAllIngredient = this.delAllIngredient.bind(this);
		this.saveEditedName = this.saveEditedName.bind(this);
		this.handleEditRecipeName = this.handleEditRecipeName.bind(this);
		this.handleClickEditRecipe = this.handleClickEditRecipe.bind(this);
		this.handleClickAddIng = this.handleClickAddIng.bind(this);
	}

	eachIng(ing){
		if (Object.keys(ing).length !== 0){
			return (
				<Ingredient ing={ing}
									  key={ing.id}
									  id={ing.id}
									  parentId={this.props.id}
									  delIng={this.props.delIng}
									  handleIngTitle={this.props.handleIngTitle} 
		 								handleIngQty={this.props.handleIngQty}
		 								handleIngUnit={this.props.handleIngUnit}
		 								saveEdit={this.props.editIngredient}/>
			);
		}
		
	}


	removeRecipe(){
		this.props.remRecipe(this.props.id);
	}

	addIngredient () {
		this.props.addIng(this.props.id);
		this.handleClickAddIng();
	}
	delAllIngredient () {
		this.props.delAllIng(this.props.id);
	}

	saveEditedName() {
			this.props.saveEdit(this.props.id, this.state.editedRecipeName);
			this.handleClickEditRecipe();
	}
	handleEditRecipeName (event) {
		this.setState({
	 		editedRecipeName:event.target.value
		});
	}

	handleClickEditRecipe() {
		this.setState({
			editingName:!this.state.editingName
		});
	}

	handleClickAddIng() {
		this.setState({
			AddingIng:!this.state.AddingIng
		});
	}

	render () {
		//console.log(Object.keys(this.props.ingredients[0]));
		return (
			<div className='col-12 col-sm-6'>
				<div className="card">
					<div className="card-header">
						<h3>{this.props.title}</h3>
						<div className="row">
							<button className="ml-2 btn" onClick={this.handleClickEditRecipe} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
							<button className="ml-2 btn btn-danger" onClick={this.removeRecipe}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
						</div>
					</div>
				 	<div className="card-body">
				 		{this.state.editingName && (<div id="editToggle">
							<form action='#'>
				  				<div className="form-row">
				    				<div className="form-group col">
				      				<input autoFocus onChange={this.handleEditRecipeName} type="text" className="form-control" id="recipeEdit" placeholder="New Recipe Name"></input>
				    			</div>
								</div>
							</form>

							<button type="button" className="btn btn-success mb-4" onClick={this.saveEditedName}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
						</div>)}
						<h4>Ingredients</h4>
				 		<button className="btn" onClick={this.handleClickAddIng}><i className="fa fa-plus" aria-hidden="true"></i></button>
		 				<button className="ml-2 btn btn-danger" onClick={this.delAllIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
		 				{this.state.AddingIng && (<div className="mt-2">
			 				<AddIngForm handleIngTitle={this.props.handleIngTitle} 
					 								handleIngQty={this.props.handleIngQty}
					 								handleIngUnit={this.props.handleIngUnit}/>
							<button onClick={this.addIngredient} className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
						</div>)}
			 			<table className='mt-4' style={{width:'100%'}}>
			 				<thead>
			 				{/*}
				 				<tr>
				 					<th>Name</th>
				 					<th>Qty</th>
				 					<th>Units</th>
				 					<th>Action</th>
				 					<th>Remove</th>
			 					</tr>
		 					*/}	
		 					</thead>
		 					<tbody>
				 				{this.props.ingredients.map(this.eachIng)}
			 				</tbody>
		 				</table>
				 	</div>
				 </div>
			 </div>
		);
	}
}

class AddRecipeForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<form action='#'>
			  <div className="form-row">
			    <div className="form-group col">
			      <input autoFocus onChange={this.props.onChange} type="text" className="form-control" id="recipeName" placeholder="Recipe Name"></input>
			    	<button type="button" onClick={this.props.onSaveButton} className="btn btn-success mt-2"><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
			    </div>
		    </div>
			</form>
		);
	}
}

class AddIngForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<form action='#'>
		    <div className="form-row">
			    <div className="form-group col-12">
			      <input autoFocus onChange={this.props.handleIngTitle} type="text" className="form-control" id="ingName" placeholder="Ingredient Name"></input>
			    </div>
			    <div className="form-group col">
			      <input onChange={this.props.handleIngQty} type="text" className="form-control" id="qty" placeholder="Qty"></input>
			    </div>
			    <div className="form-group col">
			      <input onChange={this.props.handleIngUnit} type="text"  className="form-control" id="unit" placeholder="Unit"></input>
			    </div>
			  </div>
			</form>
		);
	}
}

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing:false,
			editedTitle:this.props.ing.title,
			editedQty:this.props.ing.qty,
			editedUnit:this.props.ing.unit
		};
		this.deleteIngredient = this.deleteIngredient.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);

		this.handleEditIngTitle = this.handleEditIngTitle.bind(this);
		this.handleEditIngQty = this.handleEditIngQty.bind(this);
		this.handleEditIngUnit = this.handleEditIngUnit.bind(this);

		this.handleClickSaveEdit = this.handleClickSaveEdit.bind(this);
	}
	//editing of ingredients
	handleEditIngTitle (event){
		this.setState({
	 		editedTitle:event.target.value
		});
	}
	handleEditIngQty (event){
		this.setState({
	 		editedQty:event.target.value
		});
	}
	handleEditIngUnit (event){
		this.setState({
	 		editedUnit:event.target.value
		});
	}
	deleteIngredient() {
		this.props.delIng(this.props.parentId, this.props.id);
	}
	handleClickEdit() {
		this.setState({
			editing:!this.state.editing
		});
	}
	handleClickSaveEdit() {
		var updatedIngredient = {id:this.props.ing.id,title:this.state.editedTitle, qty:this.state.editedQty, unit:this.state.editedUnit}
		console.log(this.props.ing);
		console.log(updatedIngredient);
		this.props.saveEdit(this.props.parentId, this.props.id, updatedIngredient);
		this.handleClickEdit();
	}
	render () {
		return (
			<span>
			{!this.state.editing ? (
				<tr>
					<td style={{width:'60%'}}>{this.props.ing.title}</td>
					<td style={{width:'15%'}}>{this.props.ing.qty}</td>
					<td style={{width:'15%'}}>{this.props.ing.unit}</td>
					<td style={{width:'5%'}}><button className="btn" onClick={this.handleClickEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
					<td style={{width:'5%'}}><button className="btn btn-danger" onClick={this.deleteIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
				</tr>	
			) : (
				<tr>
					<td style={{width:'60%'}}><input autoFocus onChange={this.handleEditIngTitle} type="text" className="form-control" placeholder={this.props.ing.title}></input></td>
					<td style={{width:'15%'}}><input onChange={this.handleEditIngQty} type="text" className="form-control"  placeholder={this.props.ing.qty}></input></td>
					<td style={{width:'15%'}}><input onChange={this.handleEditIngUnit} type="text" className="form-control"  placeholder={this.props.ing.unit}></input></td>
					<td style={{width:'5%'}}><button onClick={this.handleClickSaveEdit} className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i></button></td>
					<td style={{width:'5%'}}><button className="btn btn-danger" onClick={this.deleteIngredient}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
				</tr>
			)}
			</span>
			
		);
	}
}


ReactDOM.render(<RecipeApp/>, document.getElementById('react-container'));
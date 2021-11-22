<script src="./js"></script>


<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear Alumno</h4>
            
            <form class="needs-validation" @submit.prevent="formSubmit">
              <div class="row">

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="nivel">Nombres</label>
                        <input
                        id="nivel"
                        v-model="form.nombres"
                        type="text"
                        class="form-control"
                        />
                    </div>
                  </div>

              </div>
              <button class="btn btn-primary" type="submit">Submit form</button>
            </form>
          </div>
        </div>
        <!-- end card -->
      </div>
      
    </div>
    <!-- end row -->
  </Layout>
</template>

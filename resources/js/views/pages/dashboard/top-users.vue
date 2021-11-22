<script>
/**
 * Top-users component
 */
export default {
    data() {
        return {
            users: [{
                    profile: require("../../../assets/images/users/avatar-4.jpg"),
                    name: "Glenn Holden",
                    location: "Nevada",
                    status: "Cancel",
                    price: "$250.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-5.jpg"),
                    name: "Lolita Hamill",
                    location: "Texas",
                    status: "Success",
                    price: "$110.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-6.jpg"),
                    name: "Robert Mercer",
                    location: "California",
                    status: "Active",
                    price: "$420.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-7.jpg"),
                    name: "Marie Kim",
                    location: "Montana",
                    status: "Pending",
                    price: "$120.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-8.jpg"),
                    name: "Sonya Henshaw",
                    location: "Colorado",
                    status: "Active",
                    price: "$112.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-2.jpg"),
                    name: "Marie Kim",
                    location: "Australia",
                    status: "Success",
                    price: "$120.00",
                },
                {
                    profile: require("../../../assets/images/users/avatar-1.jpg"),
                    name: "Sonya Henshaw",
                    location: "India",
                    status: "Cancel",
                    price: "$112.00",
                },
            ],
        };
    },
};
</script>

<template>
<div class="col-xl-4">
    <div class="card">
        <div class="card-body">
            <div class="float-end">
                <b-dropdown variant="white" toggle-class="p-0" menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <span class="text-muted">
                            All Members
                            <i class="mdi mdi-chevron-down ms-1"></i>
                        </span>
                    </template>
                    <b-dropdown-item href="#">Locations</b-dropdown-item>
                    <b-dropdown-item href="#">Revenue</b-dropdown-item>
                    <b-dropdown-item href="#">Join Date</b-dropdown-item>
                </b-dropdown>
            </div>
            <h4 class="card-title mb-4">Top Users</h4>

            <div data-simplebar style="max-height: 336px;">
                <div class="table-responsive">
                    <table class="table table-borderless table-centered table-nowrap">
                        <tbody>
                            <tr v-for="(item, index) in users" :key="index">
                                <td style="width: 20px;">
                                    <img :src="item.profile" class="avatar-xs rounded-circle" alt="..." />
                                </td>
                                <td>
                                    <h6 class="font-size-15 mb-1 fw-normal">{{item.name}}</h6>
                                    <p class="text-muted font-size-13 mb-0">
                                        <i class="mdi mdi-map-marker"></i>
                                        {{item.location}}
                                    </p>
                                </td>
                                <td>
                                    <span class="badge font-size-12" :class="{
                                        'bg-soft-success': item.status === 'Success',
                                        'bg-soft-danger': item.status === 'Cancel',
                                        'bg-soft-info': item.status === 'Active',
                                        'bg-soft-warning': item.status === 'Pending'}">{{item.status}}</span>
                                </td>
                                <td class="text-muted fw-semibold text-end">
                                    <i class="icon-xs icon me-2 text-success" data-feather="trending-up"></i>
                                    {{item.price}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- enbd table-responsive-->
            </div>
            <!-- data-sidebar-->
        </div>
        <!-- end card-body-->
    </div>
    <!-- end card-->
</div>
<!-- end col -->
</template>

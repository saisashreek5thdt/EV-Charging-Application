import axios from 'axios'
const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY="AIzaSyA2N_EmbXomYLcAyJX0Sxd4H6mWGkOh8HA";
const CLERK_API_KEY = "pk_test_aW5zcGlyZWQtY2F0ZmlzaC00LmNsZXJrLmFjY291bnRzLmRldiQ";
const FIREBASE_API="AIzaSyAPcJ37Mk-6JkdlCqkthOD0NsfjO6lHPCs"
const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':API_KEY,
        'X-Goog-FieldMask':[
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.evChargeOptions',
    'places.shortFormattedAddress',
    'places.photos','places.id']
    }
}

const NewNearByPlace=(data)=>axios.post(BASE_URL,data,config);

export default{
    NewNearByPlace,
    API_KEY,
    CLERK_API_KEY,
    FIREBASE_API
}
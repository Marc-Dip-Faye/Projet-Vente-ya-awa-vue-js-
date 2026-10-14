<script setup>
    import { computed, defineProps } from 'vue';
    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const statutStock = computed(()=>{
        if(props.product.stock === 0){
            return "rupture";
        }else if(props.product.stock <= 5){
            return "Stock faible";
        }else{
            return "Disponible";
        }
    });

    const couleurStock = computed(()=>{
        if(props.product.stock === 0){
            return "stock-rupture";
        } else if (props.product.stock <= 5) {
            return "stock-faible"; 
        } else {
            return "stock-disponible";
        }
    })

    const hasPromo = computed(() => {
    // On vérifie que le salePrice existe, qu'il est > 0 et qu'il est bien inférieur au prix normal
        return (
            props.product.salePrice !== null && 
            props.product.salePrice > 0 && 
            props.product.salePrice < props.product.price
        );
    });

</script>


<template>
    <article class="product-card" data-component="ProductCard" data-product-id="1">
       <div class="product-media"> 
        <a aria-label="Voir Riz brisé parfumé" href="produits/01-riz.html">
         <img alt="Riz brisé parfumé" height="240" loading="lazy" :src="product.image" width="360"/>
        </a>
       </div>
       <div class="product-body">
        <p class="overline">
         {{product.origin}}
        </p>
        <h3>
         <a href="produits/01-riz.html">
          {{product.name}}
         </a>
        </h3>
        <p class="muted small">
         {{product.unit}} · {{product.stock}} disponible(s)
        </p>
        <span class="stock" :class="couleurStock">
         <span aria-hidden="true">
         </span>
         {{ statutStock }}
        </span>
        <div class="product-bottom">
         <div>
            <template v-if="hasPromo">
                <del class="old-price">{{ product.price }} FCFA</del>
                <strong class="new-price">{{ product.salePrice }} FCFA</strong>
            </template>
            <template v-else>
                <!-- Le prix normal si pas de promo -->
                <strong>{{ product.price }} FCFA</strong>
            </template>
         </div>
         <button :disabled="product.stock === 0" aria-label="Ajouter Riz brisé parfumé au panier" class="add-button" data-action="ajouter-panier" type="button">
          <svg aria-hidden="true" class="icon" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" viewbox="0 0 24 24" width="20">
           <path d="M12 5v14M5 12h14">
           </path>
          </svg>
         </button>
        </div>
       </div>
      </article>
</template>


<style>
    .stock-rupture {
        background-color: #fee2e2;
        color: #dc2626;
    }

    .stock-faible {
        background-color: #fef3c7;
        color: #d97706;
    }

    .stock-disponible {
        background-color: #d1fae5;
        color: #059669;
    }

        /* * 1. On prépare la carte à l'animation */ */
    .product-card {
        /* La transition dit : "Anime tous les changements sur 0.3 secondes de façon fluide" */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
        /* Assure-toi que ta carte a déjà un fond et un arrondi pour que ce soit joli */
        background-color: white; 
        border-radius: 12px;
        overflow: hidden; /* Pour que l'image ne dépasse pas des bords arrondis */
    }

    /* 2. On définit ce qui se passe quand la souris passe dessus */
    .product-card:hover {
        /* La carte monte de 8 pixels vers le haut */
        transform: translateY(-8px);
        
        /* Une ombre douce et élégante apparaît en dessous */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    }

    .promo-badge {
        background-color: #ef4444; /* Rouge vif */
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75em;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 8px;
    }

    .old-price {
        color: #9ca3af; /* Gris clair */
        font-size: 0.9em;
        margin-right: 8px;
    }

    .new-price {
        color: #ef4444; /* Rouge pour attirer l'œil */
        font-size: 1.1em;
    }
</style>
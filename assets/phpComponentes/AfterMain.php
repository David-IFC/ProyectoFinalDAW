<footer>
    <?php if ($copy) {

        echo ' <p class="copy" >&copy; '.date("Y") .' David Fernandez Casado.<span data-key="copy">'.$texto["copy"]. '</span> </p>';
    }
    
    ; ?>

</footer>
<script src=assets/js/FuncionesCompartidas.js></script>
<?php if (!empty($java)): ?>
    <script src=assets/js/<?php echo $java; ?>></script>
<?php endif; ?>
</body>


</html>
